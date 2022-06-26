import {Rnd} from "react-rnd";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import Tag from '/components/tags'

export default function Photo(props) {
    function handleDelete(){
        fetch(`${window.location.origin}:8088/case/file`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                photos: [
                    {
                        path: props.source
                    }
                ],
                case: {
                    id: localStorage.case_id
                }
            })
        }).then(r=>{
                document.location.href='/main';
            }
        )
    }
    return (
        <Rnd
            default={{
                x: Math.random()*1000,
                y: Math.random()*500,
                width: 400,
                height: 400,
            }}
        >
            <Card sx={{ maxWidth: 3000, maxHeight: 3000, width: '100%', height: '100%' }}>
                <CardMedia
                    component="img"
                    height="70%"
                    image={props.photo}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.date}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {props.tags.map(r=>
                            <Tag key={r.name} name={r.name}/>
                        )}
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleDelete}>Исключить фото</Button>
                    <Button size="small" href={props.photo}>Скачать фото</Button>
                    <Button size="small" onClick={()=>{
                        localStorage.setItem('path', props.source);
                        props.addTagDialogOpen();
                    }}>Добавить тег</Button>
                </CardActions>
            </Card>
        </Rnd>
    )
}
import {Rnd} from "react-rnd";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import Tag from '/components/tags'

export default function Photo(props) {
    return (
        <Rnd
            default={{
                x: 0,
                y: 0,
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
                        {props.tags.map(r=>{
                            <Tag key={r.id} name={r.name}/>
                        })}
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small">Удалить фото</Button>
                    <Button size="small">Скачать фото</Button>
                </CardActions>
            </Card>
        </Rnd>
    )
}
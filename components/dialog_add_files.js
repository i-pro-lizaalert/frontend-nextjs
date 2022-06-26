import {
    DialogTitle,
    Dialog,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    TextField,
    Button, DialogContent, Box, Typography, Paper, Divider
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect} from "react";
import useEffectSkipInitialRender from "/components/hook";

export function AddFileDialog(props) {
    const { onClose, open } = props;
    const [name, setName] = useState('')
    const [data, setData] = useState([])
    const handleClose = () => {
        onClose('');
    };
    const handleGoodClose = () =>{
        onClose(name)
    }
    useEffectSkipInitialRender(()=>{
        setData([])
        fetch(`${window.location.origin}:8088/list`).then(r=>{
            if(r.status == 200){
                r.json().then(r=>{
                    let temp = []
                    r.forEach(r=>{
                        temp.push(fetch(`${window.location.origin}:8088/file?path=${r}`))
                    })
                    Promise.all(temp).then(responses=>{
                        responses.forEach(res=>{
                            if (res.status == 200)
                                res.json().then(res=>{
                                    console.log(res)
                                    setData(state => [...state, res])

                                })
                        })
                        setData(state => [...new Set(state)])
                    })
                })
            }
        })
    },[])
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Выберете фотографию в кейс</DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Box sx={{m:1}}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            label='Путь к фотографии'
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={()=>{handleGoodClose()}}
                        >
                            Готово
                        </Button>
                    </Box>
                    <Box sx={{m:1}}>
                        <Typography variant='h6'>
                            Файлы:
                        </Typography>
                        <Divider sx={{mb: 2}}/>
                        {data.map((r)=>
                            <Box key={r.path} sx={{display: 'flex', flexDirection: 'row'}}>
                                <Avatar sx={{mr: 1}} src={`${window.location.origin}:8088/`+r.path}/>
                                <Typography key={r}>
                                    {r.photo.source}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
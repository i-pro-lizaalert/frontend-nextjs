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
        fetch(`${window.location.origin}:8088/list`).then(r=>{
            if(r.status == 200){
                r.json().then(r=>{
                    console.log(r);
                    setData(r);
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
                            <Typography key={r}>
                                {r}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
import {
    DialogTitle,
    Dialog,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    TextField,
    Button, DialogContent
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
export function AddTagDialog(props) {
    const { onClose, open } = props;
    const [name, setName] = useState('')
    const handleClose = () => {
        onClose('');
    };

    const handleGoodClose = () =>{
        onClose(name)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Создайте тег</DialogTitle>
            <DialogContent>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    multiline
                    label='Введите имя тега'
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
            </DialogContent>
        </Dialog>
    );
}
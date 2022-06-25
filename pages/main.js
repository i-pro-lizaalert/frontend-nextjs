import {
    Avatar,
    Container,
    TextField,
    Box,
    Typography,
    Button,
    Link,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Divider,
    List,
    Fab
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react'
import {CaseItems, PhotoItems} from '/components/menuItems'
import AddIcon from '@mui/icons-material/Add';
import Case from '/components/case'
import {Add} from "@mui/icons-material";
import {Rnd} from "react-rnd"
import Photo from '/components/photo'
import {AddCaseDialog} from '/components/dialog_add_case'

const theme = createTheme();

export default function AllCases(){
    const [open, setOpen] = useState(false);
    const [addCase, setAddCase] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleClose = (val) => {
        console.log(val)
        setAddCase(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        color='inherit'
                        sx={{mr: 5}}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        open={open}
                        onClose={()=>{setOpen(false)}}
                    >
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: [1],
                            }}
                        >
                            <Typography variant='h5' color={'inherit'}>
                                Меню
                            </Typography>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            <CaseItems select={1}/>
                            <Divider sx={{ my: 1 }} />
                            <PhotoItems select={1}/>
                        </List>
                    </Drawer>
                    <Typography variant='h6' sx={{flexGrow: 1}}>
                        Все кейсы
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                height: '10000px'
            }}>
                {/*<Photo/>*/}
            </Container>
            <Fab variant="extended" sx={{
                position:'fixed',
                bottom: '3em',
                right: '3em'
            }}>
                <AddIcon sx={{ mr: 1 }} />
                Добавить
            </Fab>
        </ThemeProvider>
    );
}
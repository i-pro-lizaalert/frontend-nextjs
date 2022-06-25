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

const theme = createTheme();

export default function AllCases(){
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    let data = [
        {
            name: 'Необработанное',
            photos: 120,
            participated: 23,
            action: 2,
        },
        {
            name: 'Для СМИ',
            photos: 1231,
            participated: 5,
            action: 2,
        },
        {
            name: 'Волонтеры',
            photos: 1002,
            participated: 23,
            action: 2,
        },
        {
            name: 'Наши люди',
            photos: 542,
            participated: 100,
            action: 1,
        },
        {
            name: 'Лесной поход',
            photos: 14,
            participated: 3,
            action: 1,
        },
        {
            name: 'Весенние вылазки',
            photos: 300,
            participated: 43,
            action: 2,
        },
        {
            name: 'Водные поиски',
            photos: 200,
            participated: 14,
            action: 1,
        },
        {
            name: 'Зимние поиски',
            photos: 312,
            participated: 36,
            action: 2,
        },

    ]
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
            }}>
                {data.map(res=>
                    <Case name={res.name} photos={res.photos} participated={res.participated} action={res.action}/>
                )}
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
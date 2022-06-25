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
import {useState, useEffect} from 'react'
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
    const [data, setData] = useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleClose = (val) => {
        console.log(val)
        setAddCase(false);
    }
    useEffect(()=>{
        if(localStorage.case_id)
            fetch(`${window.location.origin}:8088/case/file?case_id=${localStorage.case_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }).then(r=>{
                if(r.status == 200){
                    r.json().then(r=>{
                        let temp = [];
                        r.forEach(e=>{
                            temp.push(fetch(`${window.location.origin}:8088/file?path=${e}`))
                        })
                        console.log(temp);
                        Promise.all(temp).then(responses=>{
                            responses.forEach(res=>{
                                res.json().then(res=>{
                                    setData(state => [...state, res])
                                })
                            })
                        })
                    })
                }else{
                    r.json().then(r=>{
                        console.log(r)
                    })
                }
            })
    },[])
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
                            <CaseItems select={3}/>
                            <Divider sx={{ my: 1 }} />
                            <PhotoItems select={3}/>
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
                {data.map(r=>
                    <Photo key={r.path} photo={`${window.location.origin}:8088/`+r.path} tags={[]}></Photo>
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
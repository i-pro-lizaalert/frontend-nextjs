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
import useEffectSkipInitialRender from "/components/hook";

const theme = createTheme();

export default function AllCases(){
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [data, setData] = useState([]);
    function handleClick(id) {
        console.log(id)
        fetch(`${window.location.origin}:8088/user/case`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(r=>{
            if(r.status == 200){
                document.location.href='/my_cases'
            }else{
                r.json().then(r=>{
                    console.log(r)
                })
            }
        })
    }
    useEffectSkipInitialRender(()=>{
        fetch(`${window.location.origin}:8088/user/case/all`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(r=>{
            if(r.status == 200){
                r.json().then(r=>{
                    console.log(r)
                    r.forEach((e,t)=>{
                        fetch(`${window.location.origin}:8088/case/file?case_id=${e.id}`,{
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json'
                            }
                        }).then(f=>{
                            if (f.status == 200){
                                f.json().then(f=>{
                                    console.log(r)
                                    r[t].photos = f.length
                                    setData(r)
                                })
                            }
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
                            <CaseItems select={2}/>
                            <Divider sx={{ my: 1 }} />
                            <PhotoItems select={2}/>
                        </List>
                    </Drawer>
                    <Typography variant='h6' sx={{flexGrow: 1}}>
                        Мои кейсы
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
                    <Case key={res.name} id={res.id} name={res.name} photos={res.photos} action={1} handleClick={handleClick} participated={res.participated}/>
                )}
            </Container>
        </ThemeProvider>
    );
}
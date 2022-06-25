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
import SearchIcon from '@mui/icons-material/Search';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {AddCaseDialog} from '/components/dialog_add_case'
import {SearchDialog} from "/components/dialog_search_tags"

const theme = createTheme();

export default function AllCases(){
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [addCase, setAddCase] = useState(false);
    const [data, setData] = useState([]);
    const [once, setOnce] = useState(0)
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleClose = (val) => {
        console.log(val)
        setAddCase(false);
    }
    const handleCloseSearch = (val) => {
        console.log(val)
        setSearchOpen(false);
        fetch(`${window.location.origin}:8088/file/search?tags=string&tags=string2`).then(r=>{
            if(r.status == 200){
                r.json().then(r=>{
                    console.log(r)
                    fetch(`${window.location.origin}:8088/user/case`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({id: r})
                    }).then(r=>{
                        if(r.status == 200){
                            document.location.href='/cases'
                        }
                    })
                })
            }
        })
    }
    useEffect(()=>{
        if (!once) {
            setData([]);
            console.log(localStorage.photos)
            if (localStorage.photos){
                console.log('here')
                let temp = [];
                let res = JSON.parse(localStorage.photos)
                localStorage.removeItem('photos')
                res.forEach(r=>{
                    temp.push(fetch(`${window.location.origin}:8088/file?path=${r}`))
                })
                Promise.all(temp).then(responses=>{
                    responses.forEach(res=>{
                        if (res.status == 200)
                            res.json().then(res=>{
                                setData(state => [...state, res])

                            })
                    })
                    setData(state => [...new Set(state)])
                })
            }
            else if(localStorage.case_id)
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
                        Promise.all(temp).then(responses=>{
                            responses.forEach(res=>{
                                if(res.status == 200)
                                    res.json().then(res=>{
                                        setData(state => [...state, res])

                                    })
                            })
                            setData(state => [...new Set(state)])
                        })
                    })
                }else{
                    r.json().then(r=>{
                        console.log(r)
                    })
                }
            })
            setOnce(1)
        }
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
                {data.forEach(r=>{
                    console.log(r);
                })}
                {[...new Set(data)].map(r=>
                    <Photo source={r.photo.source} key={r.path} photo={`${window.location.origin}:8088/`+r.path} tags={r.tags}></Photo>
                )}
            </Container>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alightItems: 'center',
                position:'fixed',
                bottom: '3em',
                right: '3em'
            }}>
                <Fab variant="extended" sx={{m:1}}>
                    <SearchIcon sx={{ mr: 1 }} />
                    Поиск по тегам
                </Fab>
                <Fab variant="extended" sx={{m:1}} onClick={()=>{setSearchOpen(true)}}>
                    <WorkspacesIcon sx={{ mr: 1 }} />
                    Сгруппировать
                </Fab>
                <Fab variant="extended" sx={{m:1}}>
                    <AddIcon sx={{ mr: 1 }} />
                    Добавить
                </Fab>
                <SearchDialog open={searchOpen} onClose={handleCloseSearch}/>
            </Box>
        </ThemeProvider>
    );
}
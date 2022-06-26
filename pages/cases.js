import {AppBar, Container, Divider, Drawer, Fab, IconButton, List, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from 'react'
import {CaseItems, PhotoItems} from '/components/menuItems'
import AddIcon from '@mui/icons-material/Add';
import Case from '/components/case'
import {AddCaseDialog} from "/components/dialog_add_case"
import useEffectSkipInitialRender from "/components/hook";

const theme = createTheme();

export default function AllCases() {
    const [open, setOpen] = useState(false);
    const [addCase, setAddCase] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleClose = (val) => {
        console.log(val)
        setAddCase(false);
        if (val) {
            fetch(`${window.location.origin}:8088/case`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: val})
            }).then(r => {
                if (r.status == 200) {
                    r.json().then(r => {
                        console.log(r)
                        fetch(`${window.location.origin}:8088/user/case`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({id: r})
                        }).then(r => {
                            if (r.status == 200) {
                                document.location.href = '/cases'
                            }
                        })
                    })
                }
            })
        }
    }

    function handleClick(id) {

    }

    const [data, setData] = useState([]);
    useEffectSkipInitialRender(() => {
        fetch(`${window.location.origin}:8088/case/all`).then(r => {
            if (r.status == 200) {
                r.json().then(r => {
                    console.log(r)
                    r.forEach((e, t) => {
                        // fetch(`${window.location.origin}:8088/case/user/all?id=${e.id}`).then(f=>{
                        //     if (f.status == 200){
                        //         f.json().then(f=>{
                        //             r[t].participated = f.length
                        //             setData(r)
                        //         })
                        //     }
                        // })
                        fetch(`${window.location.origin}:8088/case/file?case_id=${e.id}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json'
                            }
                        }).then(f => {
                            if (f.status == 200) {
                                f.json().then(f => {
                                    console.log(r)
                                    r[t].photos = f.length
                                    setData(r)
                                })
                            }
                        })
                    })

                })
            } else {
                r.json().then(r => {
                    console.log(r)
                })
            }
        })
    }, [])

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
                        onClose={() => {
                            setOpen(false)
                        }}
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
                        <Divider/>
                        <List component="nav">
                            <CaseItems select={1}/>
                            <Divider sx={{my: 1}}/>
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
                {data.map(res =>
                    <Case key={res.name} id={res.id} name={res.name} photos={res.photos} action={2}
                          handleClick={handleClick} participated={res.participated}/>
                )}
            </Container>
            <Fab variant="extended" sx={{
                position: 'fixed',
                bottom: '3em',
                right: '3em'
            }}
                 onClick={() => {
                     setAddCase(true)
                 }}
            >
                <AddIcon sx={{mr: 1}}/>
                Добавить
            </Fab>
            <AddCaseDialog open={addCase} onClose={handleClose}/>
        </ThemeProvider>
    );
}
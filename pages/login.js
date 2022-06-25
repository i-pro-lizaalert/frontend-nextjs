import {Avatar, Container, TextField, Box, Typography, Button, Link} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";

const theme = createTheme();

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event)=> {
        event.preventDefault();
        console.log(username,password)
        fetch('http://host.docker.internal:8088/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&password=${password}`
        }).then((res) => {
            if (res.status == 200) {
                res.json().then((res) => {
                    localStorage.setItem('token', res['access_token']);
                    document.location.href = '/cases'
                })
            } else {
                res.json().then((res) => {
                    alert(res['detatils']);
                })
            }
        })
    }
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='xs' sx={{height: '100%'}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%'
                }}>
                    <Avatar sx={{m: 1, backgroundColor: 'primary.main'}}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход в аккаунт
                    </Typography>
                    <Box component='form' sx={{mt: 1}} onSubmit={handleSubmit}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='login'
                            label='Логин'
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='password'
                            label='Пароль'
                            type='password'
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display:'flex',
                            flexDirection: 'column',
                            alignItems:'flex-end',
                            width: '100%'
                        }}
                    >
                        <Link href='/register' variant='body2'>
                            {'Нет аккаунта? Зарегистрироваться'}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
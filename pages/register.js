import {Avatar, Container, TextField, Box, Typography, Button, Link} from '@mui/material'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react'

const theme = createTheme();

export default function Register(){
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event)=>{
        event.preventDefault();
        let output = new FormData();
        output.append('name', name);
        output.append('surname', surname);
        output.append('username', username);
        output.append('password', password);
        fetch('http://localhost:8088/registration', {
            method: 'POST',
            body: output
        }).then((res) => {
            if (res.status == 200) {
                res.json().then((res) => {
                    localStorage.setItem('token', res['access_token']);
                    document.location.href = '/login'
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
                        <VpnKeyIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box onSubmit={handleSubmit} component='form' sx={{mt: 1}}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='name'
                            label='Имя аккаунта'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='surname'
                            label='Фамилия аккаунта'
                            value={surname}
                            onChange={(e) => {setSurname(e.target.value)}}
                        />
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
                            Зарегистрироваться
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
                        <Link href='/login' variant='body2'>
                            {'Зарегистрированы? Войти'}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
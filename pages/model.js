import {Avatar, Box, Button, Container, Paper, Typography} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import AutoModeIcon from '@mui/icons-material/AutoMode';

const theme = createTheme();

export default function Model() {
    const [file, setFile] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name)
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }).then(r => {
            if (r.status == 200) {
                r.json().then(r => {
                    console.log(r);
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
                        <AutoModeIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h4" sx={{mb: 5}}>
                        Присваивание тегов
                    </Typography>
                    <Box component='form' sx={{mt: 1, width: 'fit-content'}} onSubmit={handleSubmit}>
                        <Paper elevation={3} sx={{p: 2, mt: 2}}>
                            <Typography variant='h6'>
                                Загрузка изображения:
                            </Typography>
                            <input
                                type='file'
                                label='Изображение'
                                sx={{m: 1}}
                                onChange={(e) => {
                                    setFile(e.target.files[0])
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Получить теги
                            </Button>
                        </Paper>
                    </Box>
                    <Box sx={{width: '100%', mt: 3}}>
                        <Paper elevation={3} sx={{p: 1, minHeight: 200}}>
                            <Typography variant='h5' sx={{mt: 1}}>
                                Результаты тегирования:
                            </Typography>
                            <Typography>
                                .
                            </Typography>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
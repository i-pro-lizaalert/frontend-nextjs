import {Box, Button, Card, Typography} from "@mui/material";


export default function Case(props){
    return (
        <Card sx={{
            m: 2,
            width: '100%',
            maxWidth: 300,
            height: 'fit-content'
        }}>
            <Typography color='text.secondary' sx={{
                ml: 1.5,
                mt: 1,
                fontSize: 14
            }}>
                Кейс
            </Typography>
            <Typography variant='h5' sx={{
                ml: 1.5
            }}>
                {props.name}
            </Typography>
            <Box sx={{
                display: 'flex',
                m: 1,
                mt: 1.5,
            }}>
                <Typography color='text.secondary' sx={{
                    fontSize: 14
                }}>
                    Количество фотографий: {props.photos}
                </Typography>
                <Typography color='text.secondary' sx={{
                    fontSize: 14
                }}>
                    Количество участников: {props.participated}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex'
            }}>
                <Button sx={{m:'auto', mt:2}} variant="text">
                    {(props.action == 1)? 'Учавствовать' : 'Перейти'}
                </Button>
            </Box>
        </Card>
    );
}
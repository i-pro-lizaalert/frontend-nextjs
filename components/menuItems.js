import * as React from 'react';
import {ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import TagIcon from '@mui/icons-material/Tag';
import DashboardIcon from '@mui/icons-material/Dashboard';

export function CaseItems  (props) {
    return (
        <React.Fragment>
            <Typography variant='h6' color='inherit' sx={{ml: 2, my: 1}}>
                Кейсы
            </Typography>
            <ListItemButton selected={props.select == 1}>
                <ListItemIcon>
                    <WorkOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Все кейсы'/>
            </ListItemButton>
            <ListItemButton selected={props.select == 2}>
                <ListItemIcon>
                    <WorkIcon />
                </ListItemIcon>
                <ListItemText primary='Мои кейсы'/>
            </ListItemButton>
        </React.Fragment>
    );
}

export function PhotoItems(props){
    return (
        <React.Fragment>
            <Typography variant='h6' color='inherit' sx={{ml: 2, mt: 2, mb: 1}}>
                Фотографии
            </Typography>
            <ListItemButton selected={props.select == 3}>
                <ListItemIcon>
                    <InsertPhotoIcon />
                </ListItemIcon>
                <ListItemText primary='Все фотографии'/>
            </ListItemButton>
            <ListItemButton selected={props.select == 4}>
                <ListItemIcon>
                    <TagIcon />
                </ListItemIcon>
                <ListItemText primary='Поиск по тегам'/>
            </ListItemButton>
        </React.Fragment>
    );
}
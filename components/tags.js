import {Button, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";

export default function Tag(props) {
    return (
        <Chip label={props.name} sx={{mx:1}}/>
    )
}
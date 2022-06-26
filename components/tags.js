import {Chip} from "@mui/material";

export default function Tag(props) {
    return (
        <Chip label={props.name} sx={{mx: 1}}/>
    )
}
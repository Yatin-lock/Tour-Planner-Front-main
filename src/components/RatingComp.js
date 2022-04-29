import { Rating ,  Typography,Box } from "@mui/material";
function RatingComp({rate,username,desc}){
    return(
        <Box>
            <Rating name="read-only" value={rate} readOnly />
            {username} {desc}
        </Box>
    )
}

export default RatingComp;
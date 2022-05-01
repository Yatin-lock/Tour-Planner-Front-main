import { Rating, Box } from "@mui/material";
import '../css/RatingComp.css'
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
function RatingComp({ rate, username, desc }) {
    return (
        <div class="testimonial-box">
            <div class="box-top">
                <div class="profile">
                    <div class="profile-img">
                        <Avatar sx={{ bgcolor: deepOrange[500] }}  aria-label="recipe">
                            {username[0]}
                        </Avatar>
                    </div>
                    <div class="name-user">
                        <strong>{username}</strong>
                    </div>
                </div>
                <div class="reviews">
                    <Rating value={rate} readOnly></Rating>
                </div>
            </div>
            <div class="client-comment">
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default RatingComp;
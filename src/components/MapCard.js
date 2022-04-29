import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export  function MediaControlCardLeft() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }} style={{marginTop:"20px"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
         
        </CardContent> */}
        
        <CardMedia
        component="img"
        sx={{ width: 350 }}
        image="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="Live from space album cover"
      />
        
      </Box>
      <CardMedia
        component="img"
       
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}


export  function MediaControlCardRight() {
    const theme = useTheme();
  
    return (
      <Card sx={{ display: 'flex' }} style={{marginTop:"20px"}}>
        
        <CardMedia
          component="img"
          
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
           
          </CardContent> */}
          
          <CardMedia
          component="img"
          sx={{ width: 350 }}
          image="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Live from space album cover"
        />
          
        </Box>
      </Card>
    );
  }

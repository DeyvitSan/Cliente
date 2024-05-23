import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from "react-router-dom";


export default function MultiActionAreaCard(props) {
    const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Marca:{props.car.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Modelo:{props.car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Año:{props.car.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precio:{props.car.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
            <Button size="small" color="primary" onClick={()=>{
                navigate(`/messages/${props.car._id}`)
                }}>
                Comentar
            </Button>
      </CardActions>
    </Card>
  );
}
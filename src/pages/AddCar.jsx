import Nav from "../components/Nav"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from "axios";
function AddCar() {
    const [car, setCar] = useState({
        "brand":"",
        "model":"",
        "year":"",
        "price":""
    })
    const handleChange = (e) => {
        setCar({
            ...car,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:80/car/register",car,{
            headers: {
                token: localStorage.getItem("token")
            }
        })
        if(response.data.success){
            alert("Auto agregado")
        }else{
            alert("Error")
        }
    }
  return (
    <div>
        <Nav/>
        <h1 style={{textAlign:"center"}}>Agregar Auto</h1>
        <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"5vw"}>
            <Grid item xs={6} textAlign={"right"}>
                <TextField id="filled-basic" label="Marca" variant="filled" onChange={handleChange} name="brand"/>
            </Grid>
            <Grid item xs={6} >
                <TextField id="filled-basic" label="Modelo" variant="filled" onChange={handleChange} name="model" />
            </Grid>
            <Grid item xs={6} textAlign={"right"}>
                <TextField id="filled-basic" label="Año" variant="filled" onChange={handleChange} name="year" />
            </Grid>
            <Grid item xs={6}>
                <TextField id="filled-basic" label="Precio" variant="filled" onChange={handleChange} name="price" />
            </Grid>
            <Grid item xs={12} textAlign={"center"} marginTop={"2vw"}>
                <Button variant="contained" type="submit">Agregar</Button>
            </Grid>
        </Grid>
        </form>
    </div>
  )
}

export default AddCar
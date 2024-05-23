import Grid from '@mui/material/Grid';
import Nav from '../components/Nav';
import MultiActionAreaCard from '../components/Card';
import axios from 'axios';
import { useEffect,useState } from 'react';
function LandingPage() {
    const [cars, setCars] = useState([])
    
    

    

    useEffect(()=>{
        const getCars = async() => {
            try{
                const response = await axios.get("http://localhost:80/car/getCars",{
                headers:{
                    token:localStorage.getItem("token")
                }
                })
                setCars(response.data.cars)
            }catch(error){
                console.log(error)
            }
        }

        const getNewCar = async() => {
            try{
                const response = await axios.get("http://localhost:80/car/getNewCar",{
                headers:{
                    token:localStorage.getItem("token")
                }
                })
                console.log(response.data.notificacion)
                setCars(prevCars => [...prevCars,response.data.notificacion]);
            }catch(error){
                console.log(error)
            } finally{
                setTimeout(getNewCar,5000)
            }
        }

        getNewCar()
        getCars()

        return () => {
            clearTimeout(getNewCar)
        }
    },[])
  return (
    <div>
        <Nav/>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={"2vw"} alignItems="center" justifyContent="center" >
            {
                cars.map((car,index)=>{
                    return(
                        <Grid item xs="auto" key={index}>
                            <MultiActionAreaCard car={car} />
                        </Grid>
                    )
                })
            }
        </Grid>
    </div>
  )
}

export default LandingPage
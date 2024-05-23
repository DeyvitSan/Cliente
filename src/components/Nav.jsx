import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';


function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/landing">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/landing']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/landing', '/addcar']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Home" value="/landing" to="/landing" component={Link} />
      <Tab label="Agregar" value="/addcar" to="/addcar" component={Link} />
    </Tabs>
  );
}

// function CurrentRoute() {
//   const location = useLocation();

//   return (
//     <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
//       Current route: {location.pathname}
//     </Typography>
//   );
// }



export default function TabsRouter() {
  const [numberCars, setNumberCars] = React.useState(0)

  

  React.useEffect(()=>{
      
      const inverval = setInterval (()=>{
        getNumberCars()
      },1000)


      const getNumberCars = async () => {
        try{
            const response = await axios.get("http://localhost:80/car/count",{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            console.log(response.data.cars)
            setNumberCars(response.data.cars)
        }catch(error){
            console.log(error)
        }
      }
      getNumberCars()

      return () => {
          clearInterval(inverval)
      }
  })
  return (
      <Box sx={{ width: '100%' }}>
        <MyTabs />
        <Badge badgeContent={numberCars} color="primary" style={{margin:"1vw"}}>
          <MailIcon color="action" />
        </Badge>
      </Box>
  );
}
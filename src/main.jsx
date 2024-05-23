import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Register from "./pages/Register.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import AddCar from './pages/AddCar.jsx'
import MessagesPage from './pages/MessagesPage.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/register",
    element: <Register/>
  },
  {
    path:"/landing",
    element:<LandingPage/>
  },
  {
    path:"/addcar",
    element:<AddCar/>
  },
  {
    path:"/messages/:id",
    element:<MessagesPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)

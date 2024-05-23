import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
const socket = io.connect("http://localhost:80/comments",{
    auth:{
        token:localStorage.getItem("token")
    }
});

function MessagesPage() {
    let { id } = useParams();
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState({
        message:"",
        carId: id
    });
    const handleChange = (e) => {
        setNewMessage({
            ...newMessage,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        socket.emit("message:create",newMessage)
    }

    useEffect(()=> {
        socket.emit("message:getCommentsByCar",id)
        socket.on("message:list", (data) => {
            setMessages(data)
        })

        socket.on("message:created",async(data)=>{
            setMessages((state) => [...state,data])
        })

        return () => {
            socket.off("message:list")
            socket.off("message:created")
            socket.off("message:getCommentsByCar")
        }

    },[id])
  return (
    <div>
        <div style={{maxHeight:"38vw",overflowY:"auto"}}>
            {
                messages.map((message,index)=>{
                    return(
                        <div key={index} style={{backgroundColor:"#E8E8E8",padding:"0.2vw",margin:"1vw",borderRadius:"15px",width:"40vw"}}>
                            <p>{message.createdBy.email}</p>
                            <p>{message.message}</p>
                        </div>
                    )
                })
            }
        </div>
        <form onSubmit={handleSubmit}>
            <TextField id="filled-basic" label="Mensaje" variant="filled" onChange={handleChange} style={{width:"20vw",margin:"1vw"}} name="message" />
            <Button variant="contained" type="submit" style={{padding:"1vw",width:"10vw",margin:"1vw"}}>Enviar</Button>
        </form>
    </div>
  )
}

export default MessagesPage
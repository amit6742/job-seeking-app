import { useState } from "react"
import { useNavigate } from "react-router-dom"



const HomePage = () => {
  const [input, setInput] = useState("")
  const navigate = useNavigate()

  const handleClick = ()=>{
    if(input.length === 0){
      alert("please fill username")
    }
    else{
      navigate(`/room/${input}`)
    }

  }
 
  return (
    <div>
      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="enter you name"/>
      <button onClick={handleClick}>join</button>
    </div>
  )
}

export default HomePage
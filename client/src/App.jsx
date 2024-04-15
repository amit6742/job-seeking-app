
import { Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage";
import VideoPage from "./component/VideoPage";

const App = () => {
  return (
    <>
         <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/room/:id" element={<VideoPage/>} />
       
      </Routes>


    </>

   
  )
}

export default App
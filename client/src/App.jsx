
import  { BrowserRouter,  Route, Routes,  } from "react-router-dom";
import { useContext, useEffect } from "react";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Home from "./component/Home/Home";
import Job from "./component/Job/Job";
import JobDetails from "./component/Job/JobDetails";
import MyJob from "./component/Job/MyJob";
import PostJob from "./component/Job/PostJob";
import Footer from "./component/Layout/Footer";
import Navbar from "./component/Layout/Navbar";
import NotFound from "./component/NotFound/NotFound";
import Application from "./component/applications/Application";
import MyApplication from "./component/applications/MyApplication";
import { Context } from "./main";
import "./App.css";

import { Toaster } from "react-hot-toast";
import axios from "axios";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
 

  return (
    <>
    <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Job />} />
          <Route path="/job/me" element={<MyJob />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/:me" element={<MyApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />

      </BrowserRouter>
    </>
  );
};

export default App;

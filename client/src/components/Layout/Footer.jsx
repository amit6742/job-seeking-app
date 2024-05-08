import  { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
const Footer = () => {
  const { isAuthorized } = useContext(Context);
  
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Developer Amit 2024 .</div>
      <div>
        <Link to={"https://github.com/amit6742"} target="_blank">
        <FaGithub/>
         
        </Link>
        <Link to={"https://twitter.com/Amit_6742"} target="_blank">
          <FaTwitter />
        </Link>
        <Link to={"https://www.linkedin.com/in/amit-singh-39757925a"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"#"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"#"} target="_blank">
          <RiInstagramFill />
        </Link>
        
      </div>
    </footer>
  );
};

export default Footer;
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWork from "./HowItWork";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";


const Home = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  if(isAuthorized){
    return <Navigate to={"/login"} />
  }
  return (<>

 
    <section className="homePage page" >
    <HeroSection/>
    <HowItWork/>
    <PopularCategories/>
    <PopularCompanies/>
    </section>
    <div>
      <input  type="text"/>
      <button>join</button>
    </div>
    </>
  

    
  )
}

export default Home
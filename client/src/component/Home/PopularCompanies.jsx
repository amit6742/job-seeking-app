import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 13 Bangluru, Karnataka",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 13 Bangluru, Karnataka",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 13 Bangluru, Karnataka",
      openPositions: 20,
      icon: <FaApple />,
    },

    {
      id: 4,
      title: "Spotify",
      location: "Street 13 Bangluru, Karnataka",
      openPositions: 10,
      icon: <FaSpotify />,
    },
    {
      id: 5,
      title: "Amazon",
      location: "Street 13 Bangluru, Karnataka",
      openPositions: 5,
      icon: <FaAmazon />,
    },
    {
      id: 6,
      title: "Google",
      location: "Street 13 Bangluru, Karnataka",
      openPositions: 20,
      icon: <FaGoogle />,
    },
  ];
  return (
    <div className="companies  text-center text-2xl font-semibold ">
      <div className="container ">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;

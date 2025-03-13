import  { ReactElement } from "react";
import NavBar from "./NavBar";
import Buttton from "./ui/Button";
import Footer from "./Footer";
import { GoPlus } from "react-icons/go";
import { useMyContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

type CardProps = {
  title: string;
  icon: ReactElement;
  description: string;
};

import { FaSave, FaFolderOpen, FaSearch } from "react-icons/fa";

const features = [
  {
    icon: <FaSave />,
    title: "Capture Effortlessly",
    description:
      "Easily save links, articles, and notes with just one click.",
  },
  {
    icon: <FaFolderOpen />,
    title: "Organize Seamlessly",
    description:
      "Categorize and tag your saved items for quick access whenever you need them.",
  },
  {
    icon: <FaSearch />,
    title: "Find Instantly",
    description:
      "Use powerful search and filters to locate your important resources in seconds.",
  },
];

const Card = ({ title, icon, description }: CardProps) => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center gap-3 shadow-sm p-6 hover:shadow-md transition-shadow">
      <span className="text-primary-500 p-3 rounded-full bg-blue-100">
        {icon}
      </span>
      <h3>{title}</h3>
      <span className="text-wrap text-center">{description}</span>
    </div>
  );
};

const Home= () => {
  const {token}=useMyContext();
  const navigate=useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <NavBar />

      <main className="py-12 px-6 gap-16 flex-grow flex flex-col">
        {/* buttons and heading */}
        <div className="flex gap-6 items-center justify-center flex-col ">
          <h1 className="font-bold  text-center text-6xl tracking-tight">
            <span className="block text-slate-700">Your Digital</span>
            <h2 className=" block">Second 
            <span className="text-primary-500"> Brain</span>
            </h2>
          </h1>
          <p className="text-lg text-center max-w-2xl">
            Save, organize, and find your important links and resources in one
            place. Never lose valuable information again.
          </p>
          <Buttton
            variant="primary"
            text="Get Started"
            size="lg"
            onClickWithoutEvent={(()=>{
              if(token){
                navigate('/dashboard');
              }else{
                navigate('/signin');
              }

            })}
            startIcon={<GoPlus />}
          />
        </div>

        {/* features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:max-w-7xl lg:mx-auto">
          {features.map((feature, index) => {
            return <Card key={index} {...feature} />;
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchProfile } from "../api/userApi";
import { User } from "../utils/type";
import { logOut } from "../api/authApi";

// Define the type for your context value
interface MyContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  username:string|null;
  setUsername: (token: string | null) => void;
  userLogout:()=>void;
  loading:boolean,
  openChangeUserName:boolean,
  setOpenChangeUserName:React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | null>(null);

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername]=useState<string|null>(null);
  const [loading,setLoading]=useState(true);
  const [openChangeUserName,setOpenChangeUserName]=useState(false);
  async function fetchUser() {
    try {
      const response = (await fetchProfile()) as User;
      setUsername(response.username);
      setToken(response.token);
    } catch (error) {
      
    }
    finally{
      setLoading(false);
    }
    
  }

  async function userLogout(){
    await logOut();
    setUsername(null);
    setToken(null);
  }

    useEffect(()=>{
      fetchUser();
    },[])

  return (
    <MyContext.Provider value={{ token,loading,openChangeUserName,setOpenChangeUserName, setToken ,username,setUsername,userLogout}}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};


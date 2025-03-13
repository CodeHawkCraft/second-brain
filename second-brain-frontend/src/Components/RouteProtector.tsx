import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMyContext } from '../Context/Context';

const RouteProtector = ({children}:{children:React.ReactNode}) => {
    const pathName=useLocation().pathname;
    const {token}=useMyContext();
    const guestRoutes=['/signin','/signup','/'];
    const navigate=useNavigate();
    // console.log('pathName',pathName);
    // console.log('result of condition is ----> ',token);
    
    useEffect(()=>{
        console.log('token is -----> ',token, pathName);
        
        if (
          (guestRoutes.includes(pathName) && token) ||
          (!token && !guestRoutes.includes(pathName))
        ) {
            console.log('navigation brother ☺️');
            
          navigate("/");
        }
    },[location,token])
   
  return (
   <>
   {children}
   </>
  )

}

export default RouteProtector
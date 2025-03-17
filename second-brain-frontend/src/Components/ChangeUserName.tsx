import { useEffect, useState } from "react"
import PopUp from "./PopUp"
import Button from "./ui/Button"
import { useMyContext } from "../Context/Context";
import { updateUserName } from "../api/userApi";

const ChangeUserName = () => {
    const [newUserName,setNewUserName]=useState('');
    const {username,setUsername,setOpenChangeUserName,openChangeUserName}=useMyContext();
    useEffect(()=>{
        if(username) setNewUserName(username );
    },[])
  return (
    <>
    {openChangeUserName && 
        <PopUp
        onClose={()=>{
            setOpenChangeUserName(false);
        }}
        title={<h1 className="font-bold text-2xl ">Change UserName</h1>} 
        children={
            <div className="flex flex-col gap-7">   
                <input onChange={(e)=>{
                    setNewUserName(e.target.value);
                }} value={newUserName} className="p-2 border outline-none"></input>
                <Button 
                disabled={!newUserName || (newUserName===username)}
                onClickWithoutEvent={async()=>{
                    await updateUserName(newUserName);
                    setUsername(newUserName);
                }}  
                variant="primary"
                classes="w-full"
                text="Change"
                ></Button>
            </div>
        }
        />
    }
    </>
  )
}

export default ChangeUserName
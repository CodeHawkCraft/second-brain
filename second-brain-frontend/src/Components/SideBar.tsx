
import SideBarItems from "./SideBarItems";
import Button from "./ui/Button";
import { GiBrain } from "react-icons/gi";
import { RiTwitterXLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useMyContext } from "../Context/Context";
import { MdBorderAll } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const items = [
{
  icon: <MdBorderAll className="text-black" />,
  text: "All Content",
  type:"all",
},
  {
    icon: <RiTwitterXLine className="text-black" />,
    text: "Twitter",
    type:"twitter"
  },
  {
    icon: <FaYoutube className="text-red-500" />,
    text: "Youtube",
    type:"youtube"
  },
];

export type activeTabValidValues='all' | 'twitter' | 'youtube';

type ActiveTabProps={
  activeTab:activeTabValidValues;
  setActiveTab:React.Dispatch<React.SetStateAction<activeTabValidValues>>;
}

const SideBar = ({activeTab,setActiveTab}:ActiveTabProps) => {
 const {userLogout}=useMyContext();
  const navigate=useNavigate();
  return (
    <div className="border px-3 flex flex-col justify-between gap-3 h-screen  border-r">
      <div className="flex flex-col gap-4">
        {/* logo  */}
        <div className="flex items-center gap-3 p-3 border-b pb-3 cursor-pointer" onClick={()=>{
          navigate('/');
        }}>
          <span className="text-primary-500">
            <GiBrain size={24} />
          </span>
          <h2 className="font-bold text-xl tracking-tight">
            Second<span className="text-primary-500">Brain</span>
          </h2>
        </div>

        {/* sidebar items */}
        <div className="flex flex-col gap-2">
          {items.map((item, index) => {
            return (
              <SideBarItems onClick={()=>{
                setActiveTab(item.type as activeTabValidValues);
              }} active={item.type===activeTab} key={index} icon={item.icon} text={item.text} />
            );
          })}
        </div>
      </div>

      {/* logout button */}
      <div className="w-full border-t p-3">
        <Button
          widthFull
          onClickWithoutEvent={async()=>{
            userLogout();
          }}
          startIcon={<IoLogOutOutline />}
          size="lg"
          variant="danger"
          text="Logout"
        />
      </div>
    </div>
  );
};

export default SideBar;

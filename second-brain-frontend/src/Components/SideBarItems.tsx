import { ReactElement } from "react";

type SideBarProps = {
  icon: ReactElement;
  text: string;
  active?: boolean;
  onClick?: () => void;
};

const SideBarItems = ({ icon, text, active,onClick  }: SideBarProps) => {
  return (
    <div
    onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors hover:bg-blue-100 ${
        active ? "bg-blue-100 text-primary-500" : "text-gray-700"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default SideBarItems;

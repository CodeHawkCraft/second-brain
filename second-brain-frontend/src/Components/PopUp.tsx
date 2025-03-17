import React from "react";
import { IoMdClose } from "react-icons/io";

type PopUpProps = {
  title: React.ReactNode;
  children: any;
  onClose: () => void;
  classes?: string;
};
const PopUp = ({ title, children, onClose, classes }: PopUpProps) => {
  return (
    <div className="fixed inset-0 px-3  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white flex flex-col gap-6 w-[500px] p-6 rounded-lg ${classes}`}>
        <div className="flex border-b pb-2 justify-between items-center ">
          {title}
          <button
            onClick={onClose}
            className="cursor-pointer bg:gray-200 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        {children}
        </div>
      </div>
  );
};

export default PopUp;

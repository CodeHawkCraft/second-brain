import { FaShareAlt, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { deleteContent } from "../api/contentApi";
import { Tweet } from "react-tweet";

export type CardProps ={
  title: string;
  _id:string;
  content: string;
  type: "twitter" | "youtube";
  createdAt?: string;
  onDelete?:()=>void;
}
const Card = ({ title, content, type, createdAt,_id,onDelete }: CardProps) => {
  if(!content) return;
  return (
    <div className="bg-white border h-[400px] rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col ">
      {/* title and type icon */}
      <div className="p-4 flex justify-between border-b items-center gap-2">
        <div className="flex  items-center gap-2">
          <span className="rounded-full p-2 bg-red-100">
            {type == "youtube" ? (
              <FaYoutube className="text-red-500" />
            ) : (
              <FaXTwitter />
            )}
          </span>
          <span className="uppercase text-gray-600">{type}</span>
        </div>
        <span className="text-sm text-gray-400">{createdAt}</span>
      </div>

      <div className="flex flex-col  overflow-y-auto justify-between h-full">
      {/* title and link */}
      <div className="p-4 flex gap-2 flex-col">
        <h3 className="text-gray-800 font-bold">{title}</h3>

        {type == "youtube" && (
          <iframe
            src={content.replace("watch", "embed").replace("?v=", "/")}
          ></iframe>
        )}

        {type === "twitter" && (
          <Tweet id={content.split('/').pop() as string} />
        )}
        <a href={content} className="text-primary-500 break-words" target="_blank">
          {content}
        </a>
      </div>

      {/* buttons */}
      <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
        <span className="p-2 text-gray-500 hover:text-primary-500  hover:bg-gray-100  transition-colors cursor-pointer rounded-full">
          <FaShareAlt />
        </span>
        <div className="flex gap-2">
          <span className="p-2  hover:text-primary-500  hover:bg-gray-100  transition-colors cursor-pointer rounded-full">
            <MdOutlineEdit />
          </span>

          <span className="p-2  hover:text-red-500  hover:bg-gray-100  transition-colors cursor-pointer rounded-full">
            <MdDelete
              onClick={async () => {
                await deleteContent(_id);
                if (onDelete) {
                  onDelete();
                }
              }}
            />
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Card;

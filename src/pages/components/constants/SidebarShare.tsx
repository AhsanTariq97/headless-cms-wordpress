import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BiLink } from "react-icons/bi";

const SidebarShare = () => {
  return (
    <div className="flex w-full flex-col items-start justify-between space-y-4 rounded-lg border border-[#c7c7c7] p-4">
      <h2 className="text-lg font-bold leading-tight">Share this article</h2>
      <div className="flex w-full items-center justify-between">
        <BiLink
          size={40}
          className="text-[#7187A2] hover:text-[#010661] dark:hover:text-gray-200"
        />
        <AiFillLinkedin
          size={40}
          className="text-[#7187A2] hover:text-[#010661] dark:hover:text-gray-200"
        />
        <AiFillFacebook
          size={40}
          className="text-[#7187A2] hover:text-[#010661] dark:hover:text-gray-200"
        />
        <AiOutlineTwitter
          size={40}
          className="text-[#7187A2] hover:text-[#010661] dark:hover:text-gray-200"
        />
      </div>
    </div>
  );
};

export default SidebarShare;

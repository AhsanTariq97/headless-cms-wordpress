import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BiLink } from "react-icons/bi";

const SidebarShare = () => {
  return (
    <div className="flex flex-col items-start justify-between space-y-4 w-full rounded-lg p-4 border border-[#c7c7c7]">
      <h2 className="text-lg font-bold leading-tight">Share this article</h2>
      <div className="flex items-center justify-between w-full">
        <BiLink size={40} className="text-[#7187A2] hover:text-[#010661]" />
        <AiFillLinkedin
          size={40}
          className="text-[#7187A2] hover:text-[#010661]"
        />
        <AiFillFacebook
          size={40}
          className="text-[#7187A2] hover:text-[#010661]"
        />
        <AiOutlineTwitter
          size={40}
          className="text-[#7187A2] hover:text-[#010661]"
        />
      </div>
    </div>
  );
};

export default SidebarShare;

import React from "react";
import { MdPhone, MdLocationPin } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";

interface ContactDetailsProps {
  textColor: string;
  iconColor: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  textColor,
  iconColor,
}) => {
  return (
    <div
      className={`flex flex-col justify-between items-center space-y-4 lg:items-start ${textColor}`}
    >
      <div className="flex justify-between items-start">
        <MdLocationPin className="min-w-[25px]" size={25} color={iconColor} />
        <p className="text-sm font-normal text-center lg:text-left tracking-wide pl-2">
          F18, E-8 markaz, Haidari Chowk, <br />
          Block E Satellite Town, Rawalpindi, Pakistan
        </p>
      </div>
      <div className="flex justify-between items-start">
        <MdPhone size={25} color={iconColor} />
        <p className="text-sm font-normal tracking-wide pl-2">
          +92-333-6664423
        </p>
      </div>
      <div className="flex justify-between items-start">
        <RiSendPlaneFill size={25} color={iconColor} />
        <p className="text-sm font-normal tracking-wide pl-2">
          info@atrialogics.io
        </p>
      </div>
    </div>
  );
};

export default ContactDetails;

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
      className={`flex flex-col items-center justify-between space-y-4 lg:items-start ${textColor}`}
    >
      <div className="flex items-start justify-between">
        <MdLocationPin className="min-w-[25px]" size={25} color={iconColor} />
        <p className="pl-2 text-center text-sm font-normal tracking-wide lg:text-left">
          F18, E-8 markaz, Haidari Chowk, <br />
          Block E Satellite Town, Rawalpindi, Pakistan
        </p>
      </div>
      <div className="flex items-start justify-between">
        <MdPhone size={25} color={iconColor} />
        <p className="pl-2 text-sm font-normal tracking-wide">
          +92-333-6664423
        </p>
      </div>
      <div className="flex items-start justify-between">
        <RiSendPlaneFill size={25} color={iconColor} />
        <p className="pl-2 text-sm font-normal tracking-wide">
          info@atrialogics.io
        </p>
      </div>
    </div>
  );
};

export default ContactDetails;

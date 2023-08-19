interface ButtonProps {
  type: any;
  text: String;
  px?: string;
}

const Button: React.FC<ButtonProps> = ({ type, text, px }) => {
  return (
    <button
      type={type}
      className={`px-${
        px ? px : "12"
      } py-1 text-[#7187A2] dark:text-white border-2 border-[#7187A2] dark:border-white font-normal text-lg tracking-wide rounded-full shadow-button hover:text-white dark:hover:text-gray-200 outline-none hover:bg-[#010661] dark:hover:bg-gray-600 hover:border-[#010661] dark:hover:border-gray-200`}
    >
      {text}
    </button>
  );
};

export default Button;

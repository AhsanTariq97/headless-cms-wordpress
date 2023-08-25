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
      } shadow-button rounded-full border-2 border-[#7187A2] py-1 text-lg font-normal tracking-wide text-[#7187A2] outline-none hover:border-[#010661] hover:bg-[#010661] hover:text-white dark:border-white dark:text-white dark:hover:border-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200`}
    >
      {text}
    </button>
  );
};

export default Button;

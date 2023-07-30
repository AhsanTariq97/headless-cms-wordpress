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
      } py-1 text-[#7187A2] border-2 border-[#7187A2] font-normal text-lg tracking-wide rounded-full shadow-button hover:text-white outline-none hover:bg-[#010661] hover:border-[#010661]`}
    >
      {text}
    </button>
    // <button onClick={onClick} type={type} className={`px-12 py-3 bg-[#7187A2] font-bold text-lg rounded-full text-white outline-none hover:bg-[#75C3B9]`}>{text}<span className={`${pl}`}>{icon && <h1>ASDw</h1> }</span></button>
  );
};

export default Button;

import { useForm } from "react-hook-form";
import validator from "validator";

const SidebarSubscribeForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: {
      /*date: currentDate()*/
    },
  });

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      return true;
    } else {
      return "Enter valid email";
    }
  };

  return (
    <div className="flex flex-col items-start justify-between space-y-4 w-full rounded-lg p-4 border border-[#c7c7c7]">
      <h3 className="text-base font-bold leading-tight">
        Want to stay on top of all tips and news from Atrialogics?
      </h3>
      <form
        className="flex flex-col items-start justify-between w-full space-y-2 text-xs"
        // ref={form}
        onSubmit={handleSubmit((data) => {
          console.log(data);
          // updateEmailJS();
          reset();
        })}
      >
        <label htmlFor="email">Your email*</label>
        <input
          type="email"
          placeholder="example@email.com"
          className={`${
            errors.email ? "border-red-600" : "border-[#7187A2]"
          } w-full border p-2 rounded-xl outline-none shadow-lg`}
          {...register("email", {
            required: "Required",
            validate: validateEmail,
          })}
        />
        <p className="py-1 text-red-600">{errors.email?.message}</p>
        <button
          type="submit"
          className="text-[#7187A2] border border-[#7187A2] px-4 py-2 rounded-full cursor-pointer hover:bg-[#010661] hover:text-white hover:border-[#010661]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SidebarSubscribeForm;

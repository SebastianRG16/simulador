import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ViewPage() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (data.usuario === 'alarmaIncendio' && data.password === 'ULUVBOOBS') {
        navigate('/vista')
    } else {
      toast.error("Las credenciales no coinciden")
    }
  });

  return (
    <div className="w-full h-screen object-cover bg-[url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg')]">
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-transparent ">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
                Login
              </label>
              <form onSubmit={onSubmit} className="mt-10">
                <div>
                  <input
                    type="text"
                    placeholder="Usuario"
                    className="mt-1 text-lg block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("usuario", { required: true })}
                  />
                  {errors.usuario && (
                    <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px]">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="mt-7">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="mt-1 text-lg block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px]">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="mt-7">
                  <button className="bg-blue-500 text-xl w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Ingresar
                  </button>
                </div>

                <div className="flex mt-7 items-center text-center justify-center">
                  <img
                    src="https://media0.giphy.com/media/l0HlJdvh9AEfwDAiI/200w.webp?cid=ecf05e475cnwfpvntfyq2lyy69dqh0pzgf6y15xjiuue5ytl&ep=v1_gifs_search&rid=200w.webp&ct=g"
                    alt=""
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

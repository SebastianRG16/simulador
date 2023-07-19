import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const baseURL = "http://localhost:9000/api/sensores";

export function VistaImages() {
  const [post, setPost] = useState(null);
  const [modal, setModal] = useState(null);
  const [id, setId] = useState(0);
  const [nombreNuevo, setNombreNuevo] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const updateSensorName = async (id, nuevoNombre) => {
    try {
      const response = await axios.put(`${baseURL}`, {
        _id: id,
        nombre: nuevoNombre,
      });
      axios
        .get(baseURL)
        .then((response) => {
          setPost(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
      setNombreNuevo("");
      setModal(!modal);
      toast.success('El nombre se asigno con exito')
    } catch (error) {
      console.error("Error al actualizar el nombre del sensor:", error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const { nombreNuevo } = data;
    updateSensorName(id, nombreNuevo);
  });

  return (
    <div
      className={`grid grid-cols-2 h-screen w-full bg-[url('https://images.free3d.com/imgd/l63/5ffd587f3b1a1e53df492972/5868-isometric-room.png')]`}
    >
      <div
        className={`${
          modal
            ? "bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
            : "hidden"
        }`}
      >
        <div className=" bg-white px-16 py-14 rounded-md text-center">
          <form onSubmit={onSubmit} action="">
            <div className="mb-4">
              <p className="mb-4 font-bold">Editando nombre del sensor</p>
              <input
                type="text"
                placeholder="Ingrese el nuevo nombre"
                className="mt-1 text-lg block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                {...register("nombreNuevo", { required: true })}
                value={nombreNuevo}
                onChange={(e) => setNombreNuevo(e.target.value)}
              />
              {errors.nombreNuevo && (
                <span className="flex text-red-600 text-[10px] font-semibold ml-2 sm:text-[12px] md:text-[13px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px]">
                  Este campo es requerido
                </span>
              )}
            </div>
            <a
              onClick={() => setModal(!modal)}
              className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            >
              Ok
            </button>
          </form>
        </div>
      </div>
      {post?.map((sensor, index) => (
        <div
          key={index}
          className={`${
            modal
              ? "hidden"
              : "flex flex-col justify-center items-center h-[100vh]"
          }`}
        >
          <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined">
            <div className="h-full w-full">
              <div className="relative w-full">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/004/185/327/small/smoke-detector-against-indoor-fire-building-smoke-alarm-vector.jpg"
                  className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                  alt=""
                />
              </div>
              <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                <div className="mb-2">
                  <p className="text-lg font-bold text-navy-700">
                    {sensor.nombre}
                  </p>
                </div>
                <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
                  <a
                    onClick={() => {
                      setModal(!modal);
                      setId(sensor._id);
                    }}
                    className="cursor-pointer hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 bg-indigo-700 rounded-lg p-1 px-3 text-white font-semibold"
                  >
                    Editar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

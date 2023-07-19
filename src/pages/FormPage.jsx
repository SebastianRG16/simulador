import React, { useState, useEffect } from "react";
import AgujeroNegro from "../assets/agujeroNegro.png";
import Swal from "sweetalert2";

export function FormPage() {
  const [x, setX] = useState(0); // posición horizontal inicial
  const [y, setY] = useState(0); // posición vertical inicial
  const [time, setTime] = useState(0); // tiempo inicial
  const [randomY, setRandomY] = useState(0); // posición vertical aleatoria en el costado derecho
  const [randomX, setRandomX] = useState(0);
  const [calculo, setCalculo] = useState(0);
  const [velocidad, setVelocidad] = useState(""); // velocidad inicial
  const [peso, setPeso] = useState(""); // peso
  const [angulo, setAngulo] = useState(""); // ángulo
  const [iniciado, setIniciado] = useState(false); // estado de inicio
  const [reload, setReload] = useState(false); // recargar punto
  const [yf , setYf] = useState(0)
  const [xf , setXf] = useState(0)

  const VolverTirar = () => {
    setReload(true); // Establecer reload en true
    setTime(0); // Reiniciar el tiempo a cero
    setX(0); // Establecer la posición horizontal inicial
    setY(0); // Establecer la posición vertical inicial
  };

  useEffect(() => {
    const updateWindowSize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Actualizar las posiciones x e y del círculo para ajustarse al tamaño de la pantalla
      setX(windowWidth * 0.0);
      setY(windowHeight * 0.0);
    };

    if (iniciado) {
      const interval = setInterval(() => {
        const initialX = window.innerWidth * 0.0; // posición horizontal inicial
        const initialY = window.innerHeight * 0.0; // posición vertical inicial
        const velocity = Number(velocidad); // convertir a número la velocidad inicial
        const angle = Number(angulo); // convertir a número el ángulo
        const gravity = 9.8 * (Number(peso) / 100); // gravedad ajustada según el peso

        // Calcular las nuevas posiciones x e y basadas en el tiempo y las ecuaciones de movimiento parabólico
        const newX =
          initialX + velocity * Math.cos((angle * Math.PI) / 180) * time;
        const newY =
          initialY +
          (velocity * Math.sin((angle * Math.PI) / 180) * time -
            0.5 * gravity * time * time);

        setX(newX);
        setY(newY);
        setTime((prevTime) => prevTime + 0.01); // Incrementar el tiempo en cada iteración
        // if (
        //   Math.round(newY) > calculo - 120 &&
        //   Math.round(newY) < calculo - 20
        // ) {
        // }
        // if (Math.round(newX) == window.innerWidth) {
        // }
        setCalculo(window.innerHeight - Math.round(randomY));
        if (
          (Math.round(newY) > calculo - 120 &&
          Math.round(newY) < calculo - 20) &&
          (Math.round(newX) > window.innerWidth -20 && Math.round(newX) < window.innerWidth)
          
        ) 
        {
          const B = (velocidad / 3.6) *  Math.sin(angle * (Math.PI / 180));
          const C = Math.round(newY)
          const A = 4.9
          const raiz = -4 *(A)*(C)
          const b2 = B * B
          const raizResta = (b2) - (raiz)
          const solucionRaiz = Math.sqrt(raizResta)
          const divisor =2*(A)
          const resultTop1 = B - solucionRaiz
          const resultTop2 = B + solucionRaiz
          if (resultTop1 >= 0) {
            const resultFin1 = resultTop1 / divisor
            setYf(resultFin1) 
          } else {
            const resultFin2 = resultTop2 / divisor
            setYf(resultFin2)
          }

          //ALCANCE HORIZONTAL EN CUALQUIER TIEMPO
          console.log('estos es yf',yf)

          const vi = (velocidad / 3.6)
          const T = yf
          const angleRadianes = (angle * Math.PI) / 180;
          const cosT = (Math.cos(angleRadianes))
          const parentecis = vi * cosT
          const resultado = parentecis * T
          setXf(resultado)
          console.log('estos es xf',xf)

          Swal.fire({
            title: '¡FELICIDADES!',
            text: `Tuviste un tiro exitoso, el recorrido duro ${Math.round(yf)} s con una distancia de ${Math.round(xf)} m, prueba ahora otro punto`,
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then((result) => {
            if (result.isConfirmed) {
              reloadPoint();
            }
          });
        }
      }, 10);

      window.addEventListener("resize", updateWindowSize);

      return () => {
        clearInterval(interval);
        window.removeEventListener("resize", updateWindowSize);
      };
    }
  }, [time, velocidad, peso, angulo, iniciado, randomY]);

  const reloadPoint = () => {
    setReload(true); // Establecer reload en true
    setTime(0); // Reiniciar el tiempo a cero
    setX(0); // Establecer la posición horizontal inicial
    setY(0); // Establecer la posición vertical inicial
    const generateRandomY = () => {
      const windowHeight = window.innerHeight;
      const min = 0; // definir el lado izquierdo de la pantalla como el mínimo
      const max = windowHeight; // definir el lado derecho de la pantalla como el máximo
      const randomValue = Math.random() * (max - min) + min;
      setRandomX(max);
      console.log(randomValue);
      setRandomY(randomValue);
    };
    generateRandomY(); // Generar una nueva posición vertical aleatoria en el costado derecho
  };

  const handleIniciar = () => {
    setIniciado(true);
  };

  useEffect(() => {
    if (reload) {
      setIniciado(false); // Detener la animación
      setReload(false); // Establecer reload en false para evitar que se ejecute nuevamente
    }
  }, [reload]);
  return (
    <div className="bg-black w-full h-screen object-cover bg-[url('https://images2.alphacoders.com/280/280030.jpg')]">
      <div className="flex">
        <div className="flex flex-col mr-4 ml-4 mt-4">
          <label htmlFor="" className="text-gray-300 font-semibold ml-1">Velocidad</label>
          <div className="flex">
            <input
              className="bg-sky-950 text-white rounded-lg pl-3 w-[150px]"
              type="number"
              placeholder=""
              value={velocidad}
              onChange={(e) => setVelocidad(e.target.value)}
            />
            <p className="text-gray-300 ml-1 font-semibold">km/h</p>
          </div>
        </div>
        <div className="flex flex-col mr-4 ml-4 mt-4">
          <label htmlFor="" className="text-gray-300 font-semibold ml-1">Peso</label>
          <div className="flex">
            <input
              className="bg-sky-950 text-white rounded-lg  pl-3 w-[100px]"
              type="number"
              placeholder=""
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
            <p className="text-gray-300 ml-1 font-semibold">kg</p>
          </div>
        </div>
        <div className="flex flex-col mr-4 ml-4 mt-4">
          <label htmlFor="" className="text-gray-300 font-semibold ml-1">Ángulo</label>
          <div className="flex">
            <input
              className="bg-sky-950 text-white rounded-lg pl-3 w-[100px]"
              type="number"
              placeholder=""
              value={angulo}
              onChange={(e) => setAngulo(e.target.value)}
            />
            <p className="text-gray-300 ml-1 font-semibold">°</p>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleIniciar}
            className="bg-sky-950 text-white font-semibold px-4 py-1 rounded-xl mr-4"
            >
            Iniciar
          </button>
          <button
            onClick={VolverTirar}
            className="bg-sky-950 text-white font-semibold px-4 py-1 rounded-xl mr-4"
            >
            Volver a tirar
          </button>
          <button
            onClick={reloadPoint}
            className="bg-sky-950 text-white font-semibold px-4 py-1 rounded-xl mr-4"
            >
            Recargar punto
          </button>
        </div>
      </div>
      <img
        src="https://cdn.pixabay.com/photo/2020/01/19/15/02/ufo-4778062_1280.png"
        style={{
          position: "fixed",
          bottom: `${y}px`,
          left: `${x}px`,
          width: "50px",
          height: "40px",
          backgroundColor: "",
          borderRadius: "50%",
        }}
      />
      <img
        src={AgujeroNegro}
        style={{
          position: "fixed",
          top: `${randomY}px`,
          right: "0",
          width: "60px",
          height: "100px",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}

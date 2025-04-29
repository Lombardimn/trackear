import { PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import React, { FC } from "react";

type Props = {
  speed?: number; // duración de la animación en segundos
  delay?: number; // delay opcional
  color?: string; // color del avión
  trailColor?: string; // color del rastro
  size?: number; // tamaño del ícono
  hover?: boolean; // activar animación solo con hover
};

const PaperPlaneAnimation: FC<Props> = ({
  speed = 4,
  delay = 0,
  color = "#4a90e2",
  trailColor = "#ccc",
  size = 24,
  hover = false,
}) => {

  const animationId = `flightPath-${Math.random().toString(36).slice(2)}`;

  return (
    // Usamos un div contenedor para la lógica de hover si es necesario
    <div className={hover ? "group inline-block" : "inline-block"}>
      <svg
        width="100%" // O un ancho específico si lo prefieres
        height="200" // Altura fija como en tu ejemplo
        viewBox="0 0 300 200" // Mantén el viewBox
        xmlns="http://www.w3.org/2000/svg"
        // overflow:visible es importante para que el icono no se recorte
        // al salirse del viewBox durante la animación con el offset
        className="overflow-visible"
      >
        {/* Trayectoria del vuelo */}
        <path
          id={animationId}
          d="M 10 150 Q 80 60, 200 100 T 290 30" // Tu path original
          fill="none"
          stroke={trailColor}
          strokeDasharray="5 5"
          strokeWidth="2"
        />

        {/* Grupo que contiene el icono y se animará */}
        <g>
          {/* ForeignObject para renderizar el componente React (icono) */}
          {/* La clave es el offset x e y para centrar el icono en el punto de animación */}
          <foreignObject
            x={-size / 2} // Desplaza la mitad del ancho a la izquierda
            y={-size / 2} // Desplaza la mitad de la altura hacia arriba
            width={size}
            height={size}
          >
            {/* Este div asegura que el contenido dentro de foreignObject se comporte como esperado */}
             {/* No es estrictamente necesario el flex aquí si el ícono ya ocupa el tamaño */}
            <div
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              <PaperPlaneRight
                color={color}
                size={size}
                weight="duotone" // O el peso que prefieras
              />
            </div>
          </foreignObject>

          {/* Animación que mueve el grupo <g> a lo largo del path */}
          <animateMotion
            repeatCount="indefinite" // Repetir indefinidamente
            dur={`${speed}s`} // Duración de la animación
             // Inicio: inmediato o al hacer hover en el 'group'
            begin={hover ? `svgElement.hover+${delay}s` : `${delay}s`} // Corrección: Referenciar el elemento SVG o el grupo contenedor
            rotate="auto" // Orienta el icono según la dirección del path
          >
            {/* Referencia al path a seguir */}
            <mpath href={`#${animationId}`} />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
};

export default PaperPlaneAnimation;
import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Physics } from "@react-three/cannon";
import { Html } from "@react-three/drei"


createRoot(document.getElementById("root")).render(

  <>



    <div className="instructions">
      <h1>
        -Z, Q, S, D to move around
        <br />
        -E to Thirdperson
        <br />
        -R to Respawn
      </h1>
    </div>

  <Canvas>
    <Physics
      gravity={[0, -2.6, 0]}
      broadphase="SAP"
    >
      <Scene/>
    </Physics>
  </Canvas>
  </>
);

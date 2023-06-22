import { useBox } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRaycastVehicle } from "@react-three/cannon";
import { WheelDebug } from "./WheelDebug";
import { useWheels }  from "./useWheels";
import { Controls } from "./Controls";
import { Quaternion, Vector3 } from "three";

export function Car({ thirdPerson }) {
  let mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car2.glb"
  ).scene;

  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const wheelRadius = 0.05;
  const front = 0.15;

  const chassisBodyArgs = [ width, height, front * 2 ];
  const [ chassisBody, chassisApi ] = useBox(() => ({
    mass: 150,
    args: chassisBodyArgs,
    position,
  }), useRef(null));

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null),
  );

  Controls(vehicleApi, chassisApi)

  useFrame((state) => {
    if(!thirdPerson) return;

    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0, 0, -1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position.clone().add(
      wDir.clone().multiplyScalar(-1).add(
        new Vector3(0, 0.3, 0)
      )
    );

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  })

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  return (

    <group ref={vehicle} name="vehicule">
      <group ref={chassisBody} name="chassisBody">
        <primitive object={mesh} rotation-y={Math.PI} position={[0, -0.09, 0]} />
      </group>

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  )
}

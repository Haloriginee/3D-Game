import { useEffect, useState } from "react";

export const Controls = ( vehicleApi, chassisApi ) => {
  let [ control, setControl] = useState({





  });

  useEffect(() => {

    const keyDown = (e) => {
      setControl((control) => ({
        ...control,
        [e.key.toLowerCase()]: true
      }))
    }

    const keyUp = (e) => {
      setControl((control) => ({
        ...control,
        [e.key.toLowerCase()]: false
      }))
    }

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    // cleanup function
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    }
  }, [])

  useEffect(() => {

    if (control.z) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);

    } else if (control.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);

    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);

    }

    if (control.q) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);

    } else if (control.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);

    } else {
      for(let i = 0; i < 4; i++);

    }
  }, [control, vehicleApi, chassisApi])

  return control
}

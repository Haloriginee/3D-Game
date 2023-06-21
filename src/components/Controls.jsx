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
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (control.arrowdown) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    if (control.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (control.arrowleft) chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    if (control.arrowright) chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    if (control.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }

  }, [control, vehicleApi, chassisApi])

  return control
}

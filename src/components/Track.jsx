import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Track() {
  const res = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/track.glb"
  )

  const colorMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/track.png"
  )

  useEffect(() => {
    colorMap.anisotropy = 16;
  }, [colorMap])

  let geometry = res.scene.children[0].geometry;

  return (
    <mesh>
      <primitive object={geometry} attach={"geometry"} />
      <meshStandardMaterial toneMapped={false} map={colorMap} />
    </mesh>
  )
}

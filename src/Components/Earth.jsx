import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

const Earth = () => {
  const {scene} = useGLTF("/models/Earth.glb");
  const earthRef = useRef();

  useFrame(() => {
    if (!earthRef.current) return;
  })

  return (
    <RigidBody type="dynamic" colliders="ball" gravityScale={0}>
      <primitive scale={1} object={scene}/>
    </RigidBody>
  )
}

useGLTF.preload("/models/Earth.glb");
export default Earth
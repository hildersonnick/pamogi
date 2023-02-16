import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
export default function Model(props) {
  // const { nodes, materials } = useGLTF("/models/Mogi.glb");
  const gltf = useLoader(GLTFLoader, "/models/Mogi (1).glb");
  if (props.socket.id === props.player.socketId) {
    console.log("not rendering")
    return <></>;
  } else {
    console.log("rendering")
    let rot = [props.player.rotaionX, props.player.rotaionY, props.player.rotaionZ];
    return (
      <group {...props} dispose={null}>
        <group position={[props.player.positionX, props.player.positionY, props.player.positionZ]} rotation={rot}>
          <primitive object={gltf.scene} />
        </group>
      </group>
    );
  }
}
useGLTF.preload("/models/Mogi.glb");

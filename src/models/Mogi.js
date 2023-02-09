import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/Mogi.glb");

  if (props.socket.id === props.player.socketId) {
    return <></>;
  } else {
    return (
      <group {...props} dispose={null}>
        <group position={[props.player.positionX, props.player.positionY, props.player.positionZ]}>
          <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials["Material"]} />
        </group>
      </group>
    );
  }
}

useGLTF.preload("/models/Mogi.glb");

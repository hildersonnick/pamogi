import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/River4.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.River3.geometry}
        material={materials.Waterr}
      />
    </group>
  );
}

useGLTF.preload("/models/River4.glb");

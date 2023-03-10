import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/River3.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.River4.geometry}
        material={materials.Waterr}
      />
    </group>
  );
}

useGLTF.preload("/models/River3.glb");

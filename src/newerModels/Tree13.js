import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newerModels/tree13.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[14.86, 0.6, 1.81]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere002.geometry}
          material={materials["Tree_.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere002_1.geometry}
          material={materials.Vegetation}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newerModels/tree13.glb");

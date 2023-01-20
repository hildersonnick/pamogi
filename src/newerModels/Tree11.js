import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newerModels/tree11.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[11.01, 0.6, -1.74]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere015.geometry}
          material={materials["Tree_.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere015_1.geometry}
          material={materials.Vegetation}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newerModels/tree11.glb");

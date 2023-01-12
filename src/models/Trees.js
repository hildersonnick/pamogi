import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/Trees.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.92, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001.geometry}
          material={materials["Tree_.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere001_1.geometry}
          material={materials.Vegetation}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/Trees.glb");

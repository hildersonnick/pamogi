import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newerModels/sub13.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[19, 0, -22.3]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials["Waterr.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_1.geometry}
          material={materials["Waterr.003"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newerModels/sub13.glb");

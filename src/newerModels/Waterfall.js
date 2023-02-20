import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newerModels/waterfall.glb");
  // console.log("waterfall")
  return (
    <group {...props} dispose={null}>
      <group position={[54.94, 0, -0.05]} rotation={[0, 1.57, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane050.geometry}
          material={materials["Waterr.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane050_1.geometry}
          material={materials.Rocks_}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane050_2.geometry}
          material={materials.Waterr}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newerModels/waterfall.glb");

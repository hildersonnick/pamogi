import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newerModels/task131.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[15.2, 0, -20.06]}
        rotation={[props.rotate, Math.PI / 2, 0]}
        scale={[0.81, 0.79, 0.96]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105_1.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105_2.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105_3.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105_4.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105_5.geometry}
          material={materials["Material.010"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105_6.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane105_7.geometry}
          material={materials["Material.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newerModels/task131.glb");

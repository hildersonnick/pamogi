import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newerModels/task153.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[18.93, 0, -38.43]}
        rotation={[props.rotate, -Math.PI / 2, 0]}
        scale={[0.81, 0.79, 0.96]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112_1.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112_2.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112_3.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112_4.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112_5.geometry}
          material={materials["Material.010"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112_6.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane112_7.geometry}
          material={materials["Material.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newerModels/task153.glb");

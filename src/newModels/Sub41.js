import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newModels/sub41.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[35.97, 0, 4.01]}
        rotation={[-Math.PI, 1.57, -Math.PI]}
        scale={[1, 1, -1]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane024.geometry}
          material={materials["Waterr.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane024_1.geometry}
          material={materials["Waterr.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newModels/sub41.glb");

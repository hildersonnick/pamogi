import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newModels/sub51.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[43.34, 0, -5.05]}
        rotation={[-Math.PI, -1.57, -Math.PI]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029.geometry}
          material={materials["Waterr.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029_1.geometry}
          material={materials["Waterr.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newModels/sub51.glb");

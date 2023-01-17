import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newModels/sub53.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[43.34, 0, -15.3]}
        rotation={[-Math.PI, -1.57, -Math.PI]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane031.geometry}
          material={materials["Waterr.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane031_1.geometry}
          material={materials["Waterr.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newModels/sub53.glb");

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/newModels/sub24.glb");
  return (
    <group {...props} dispose={null}>
      <group
        position={[16.56, 0, 19.12]}
        rotation={[-Math.PI, -1.57, -Math.PI]}
        scale={[-1, 1, -1]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane022.geometry}
          material={materials["Waterr.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane022_1.geometry}
          material={materials["Waterr.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/newModels/sub24.glb");

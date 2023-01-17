import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/River2.glb");
  return (
    <group
      {...props}
      scale={0.3}
      dispose={null}
      position={[0 + props.index * 8, -1.85, 0 - props.index * 2.5]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.River2.geometry}
        material={materials.Waterr}
      />
    </group>
  );
}

useGLTF.preload("/River2.glb");

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/River1.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="River1"
          castShadow
          receiveShadow
          geometry={nodes.River1.geometry}
          material={materials.Waterr}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/River1.glb");

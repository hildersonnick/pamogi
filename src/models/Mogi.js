import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
export default function Model(props) {
  // const { nodes, materials } = useGLTF("/models/Mogi.glb");
  const { nodes, materials } = useLoader(GLTFLoader, "/models/Mogi (1).glb");
  // if (props.socket.id === props.player.socketId) {
  //   console.log("not rendering")
  //   return <></>;
  // } else {
  console.log(nodes)
  let rot = [props.player.rotaionX, props.player.rotaionY * Math.PI, props.player.rotaionZ];
  return (
    <group {...props} position={[props.player.positionX, props.player.positionY, props.player.positionZ]} rotation={rot} dispose={null}>
      <group >
        {/* <primitive object={gltf.scene} /> */}

        <mesh
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
        >

        </mesh>
        <mesh
          geometry={nodes.Sphere001.geometry}
          material={nodes.Sphere001.material}
        />
        <mesh
          geometry={nodes.Cylinder001.geometry}
          material={nodes.Cylinder001.material}
        >
        </mesh>

        <mesh
          geometry={nodes.Cylinder008.geometry}
          material={nodes.Cylinder008.material}
        />
        <mesh
          geometry={nodes.Cylinder009.geometry}
          material={nodes.Cylinder009.material}
        />
        {/* <mesh
          geometry={nodes.Plane001.geometry}
          material={nodes.Plane001.material}
        />
        <mesh
          geometry={nodes.Plane002.geometry}
          material={nodes.Plane002.material}
        /> */}


      </group>
    </group>
  );
  // }
}
useGLTF.preload("/models/Mogi.glb");

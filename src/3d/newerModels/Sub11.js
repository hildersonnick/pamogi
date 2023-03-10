import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
    const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/newermodels/sub11.glb');
    return (
        <group {...props} dispose={null}>
            <group position={[14.05, 0, -7.32]}>
                <mesh castShadow receiveShadow geometry={nodes.Plane016.geometry} material={materials['Waterr.003']} />
                <mesh castShadow receiveShadow geometry={nodes.Plane016_1.geometry} material={materials['Waterr.001']} />
            </group>
        </group>
    );
}

useGLTF.preload(process.env.PUBLIC_URL + '/newermodels/sub11.glb');

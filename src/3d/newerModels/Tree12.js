import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
    const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/newermodels/tree12.glb');
    return (
        <group {...props} dispose={null}>
            <group position={[14.86, 0.6, -1.74]}>
                <mesh castShadow receiveShadow geometry={nodes.Icosphere001.geometry} material={materials['Tree_.002']} />
                <mesh castShadow receiveShadow geometry={nodes.Icosphere001_1.geometry} material={materials.Vegetation} />
            </group>
        </group>
    );
}

useGLTF.preload(process.env.PUBLIC_URL + '/newermodels/tree12.glb');

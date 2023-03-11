import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import theTree from '../newerModelsGlb/tree14.glb';

export default function Model(props) {
    const { nodes, materials } = useGLTF(theTree);
    return (
        <group {...props} dispose={null}>
            <group position={[11.16, 0.6, 1.81]}>
                <mesh castShadow receiveShadow geometry={nodes.Icosphere003.geometry} material={materials['Tree_.002']} />
                <mesh castShadow receiveShadow geometry={nodes.Icosphere003_1.geometry} material={materials.Vegetation} />
            </group>
        </group>
    );
}

useGLTF.preload(theTree);

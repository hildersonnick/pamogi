import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import theSub from '../newerModelsGlb/sub11.glb';

export default function Model(props) {
    const { nodes, materials } = useGLTF(theSub);
    return (
        <group {...props} dispose={null}>
            <group position={[14.05, 0, -7.32]}>
                <mesh castShadow receiveShadow geometry={nodes.Plane016.geometry} material={materials['Waterr.003']} />
                <mesh castShadow receiveShadow geometry={nodes.Plane016_1.geometry} material={materials['Waterr.001']} />
            </group>
        </group>
    );
}

useGLTF.preload(theSub);

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import theSub from '../newerModelsGlb/sub12.glb';

export default function Model(props) {
    const { nodes, materials } = useGLTF(theSub);
    return (
        <group {...props} dispose={null}>
            <group position={[7.23, 0, -15.05]} rotation={[0, 1.57, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.Plane005.geometry} material={materials['Waterr.001']} />
                <mesh castShadow receiveShadow geometry={nodes.Plane005_1.geometry} material={materials['Waterr.003']} />
            </group>
        </group>
    );
}

useGLTF.preload(theSub);

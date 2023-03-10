import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
    const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/newermodels/sub14.glb');
    return (
        <group {...props} dispose={null}>
            <group position={[7.23, 0, -29.29]} rotation={[0, 1.57, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.Plane010.geometry} material={materials['Waterr.001']} />
                <mesh castShadow receiveShadow geometry={nodes.Plane010_1.geometry} material={materials['Waterr.003']} />
            </group>
        </group>
    );
}

useGLTF.preload(process.env.PUBLIC_URL + '/newermodels/sub14.glb');

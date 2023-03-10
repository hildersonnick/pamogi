import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
    const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/newermodels/hook1.glb');
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.hook1.geometry}
                material={materials['Waterr.001']}
                position={[13.01, 0, -2.72]}
                rotation={[0, -0.01, 0]}
            />
        </group>
    );
}

useGLTF.preload(process.env.PUBLIC_URL + '/newermodels/hook1.glb');

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
    const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/models/Waterfall.glb');
    return (
        <group
            // rotation-y={4}
            scale={0.3}
            position={[0 + props.index * 5, -1.85, 0 - props.index * 2.5]}
        >
            <group {...props} dispose={null}>
                <group position={[0, 0.82, 0]}>
                    <mesh castShadow receiveShadow geometry={nodes.stylized_rock_70002.geometry} material={materials.Rocks_} />
                    <mesh castShadow receiveShadow geometry={nodes.stylized_rock_70002_1.geometry} material={materials.Waterr} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models/Waterfall.glb');

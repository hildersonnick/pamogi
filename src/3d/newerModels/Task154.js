/* eslint-disable */
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
    if (props.progress === 'initialized' || props.progress === undefined) {
        const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/newermodels/task111.glb');
        return (
            <group {...props} dispose={null}>
                <group position={[15.59, 0, -38.43]} rotation={[props.rotate, -Math.PI / 2, 0]} scale={[0.81, 0.79, 0.96]}>
                    <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials['Material.001']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials['Material.002']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials['Material.003']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane_3.geometry} material={materials['Material.004']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane_4.geometry} material={materials['Material.005']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane_5.geometry} material={materials['Material.010']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane_6.geometry} material={materials['Material.009']} />
                    <mesh castShadow receiveShadow geometry={nodes.Plane_7.geometry} material={materials['Material.008']} />
                </group>
            </group>
        );
    }

    if (props.progress === 'complete') {
        const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/newermodels/complete.glb');
        return (
            <group {...props} dispose={null}>
                <group position={[15.59, 0, -38.43]} rotation={[props.rotate, -Math.PI / 2, 0]} scale={[0.81 / 2, 0.79 / 5, 0.96 / 2]}>
                    <group position={[0, 0.92, 0]}>
                        <mesh castShadow receiveShadow geometry={nodes.Icosphere001.geometry} material={materials['Tree_.002']} />
                        <mesh castShadow receiveShadow geometry={nodes.Icosphere001_1.geometry} material={materials.Vegetation} />
                    </group>
                </group>
            </group>
        );
    }

    if (props.progress === 'progress') {
        const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + '/newermodels/progress.glb');

        return (
            <group {...props} dispose={null}>
                <group position={[15.59, 0, -38.43]} rotation={[props.rotate, -Math.PI / 2, 0]} scale={[0.81 / 2, 0.79 / 5, 0.96 / 2]}>
                    <group {...props} dispose={null}>
                        <group position={[-0.67, 0, 0.09]} scale={0.58}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase013.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.07, 2.7, 0.48]}
                                rotation={[-1.61, 0.62, -1.48]}
                                scale={[2.52, 2.61, 2.68]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase014.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.12, 2.75, 0.78]}
                                rotation={[-0.23, 1.03, -0.83]}
                                scale={[1.71, 2.75, 2.09]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase015.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 2.43, -0.48]}
                                rotation={[-0.97, 1.06, -1.27]}
                                scale={[1.65, 2.7, 2.07]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase016.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.01, 2.15, -0.42]}
                                rotation={[-2.61, 0.58, -1.87]}
                                scale={[4.04, 3.74, 3.81]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase017.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.04, 3.27, 0.11]}
                                rotation={[-0.84, 0.81, -1.41]}
                                scale={[1.46, 2.35, 1.86]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase018.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.03, 3.75, 0.2]}
                                rotation={[0.64, 1.02, -1.13]}
                                scale={[4.86, 5.03, 4.78]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase021.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.09, 3.67, -0.39]}
                                rotation={[-2.52, 0.1, -1.91]}
                                scale={[4.97, 4.72, 4.85]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase022.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.04, 3.07, -0.04]}
                                rotation={[-2.94, 0.74, -1.38]}
                                scale={[1.5, 2.34, 1.81]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase023.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.01, 2.28, -0.82]}
                                rotation={[-1.56, 0.29, -1.91]}
                                scale={[2.61, 2.62, 2.83]}
                            />
                        </group>
                        <group position={[0.84, 0, -0.8]} scale={0.7}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase019.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.08, 2.16, 0.6]}
                                rotation={[-1.79, -0.61, -1.31]}
                                scale={[2.36, 2.39, 2.48]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase020.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.08, 2.16, 0.6]}
                                rotation={[-1.79, -0.61, -1.31]}
                                scale={[2.36, 2.39, 2.48]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase024.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.01, 1.51, -0.67]}
                                rotation={[-2.06, 0.51, -1.85]}
                                scale={[2.46, 2.41, 2.52]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase025.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.03, 1.49, -0.66]}
                                rotation={[1.6, 1.36, -1.13]}
                                scale={[0.71, 1.25, 0.91]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase026.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 1.54, -0.5]}
                                rotation={[0.74, 1.04, -0.89]}
                                scale={[1.91, 2.06, 1.92]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase027.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.01, 1.89, -0.6]}
                                rotation={[-2.78, 1.22, -1.77]}
                                scale={[2.97, 2.73, 2.73]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase028.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0, 1.7, -0.38]}
                                rotation={[-1.74, 1.05, -0.86]}
                                scale={[1.52, 2.65, 2]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase029.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.05, 1.11, 0.2]}
                                rotation={[-1.37, -0.05, -1.69]}
                                scale={[2.53, 2.52, 2.75]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase030.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.01, 2.71, -0.24]}
                                rotation={[1.23, -0.55, -1.44]}
                                scale={[3.13, 3.12, 3.27]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase031.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.02, 2.73, -0.21]}
                                rotation={[-0.97, 0.42, -1.61]}
                                scale={[3, 2.93, 3.07]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase032.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.01, 2.73, -0.19]}
                                rotation={[-0.84, 0.81, -1.41]}
                                scale={[0.77, 1.24, 0.98]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase033.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.01, 2.9, 0.18]}
                                rotation={[-2.81, 1.07, -1.92]}
                                scale={[3.11, 2.85, 2.86]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase034.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.02, 2.69, 0.14]}
                                rotation={[-0.45, 0.8, -1.4]}
                                scale={[1.31, 2.02, 1.59]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase035.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.03, 2.42, 0.48]}
                                rotation={[-2.39, 0.58, -1.52]}
                                scale={[1.37, 1.33, 1.34]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase036.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0, 2.54, 0.6]}
                                rotation={[-1.66, 1.36, -1.17]}
                                scale={[0.8, 1.44, 1.04]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase037.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 2.13, 0.27]}
                                rotation={[-1.14, 0.26, -1.89]}
                                scale={[1.91, 1.92, 2.03]}
                            />
                        </group>
                        <group position={[0.39, 0, 1.1]} scale={0.6}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase002.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.1, 2.6, 0.49]}
                                rotation={[-2.15, 1.12, -1.7]}
                                scale={[1.34, 2.26, 1.68]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase003.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.11, 2.62, 0.61]}
                                rotation={[-0.45, 0.91, -1.24]}
                                scale={[1.19, 1.79, 1.41]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase004.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[-0.03, 2.4, 0.4]}
                                rotation={[0.02, 0.85, -1.09]}
                                scale={[2.58, 2.42, 2.35]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase005.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 2.35, -0.4]}
                                rotation={[-1.31, 0.35, -1.59]}
                                scale={[3.24, 3.27, 3.53]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase007.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.06, 2.36, -0.38]}
                                rotation={[-0.84, 0.82, -1.42]}
                                scale={[0.86, 1.38, 1.09]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase009.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 2.19, -0.6]}
                                rotation={[1.57, 1.37, -1.1]}
                                scale={[1.03, 1.85, 1.33]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase010.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 3.28, -0.13]}
                                rotation={[0.13, 0.84, -1.09]}
                                scale={[3.68, 3.52, 3.39]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase011.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 3.31, 0.07]}
                                rotation={[-1.1, 0.87, -1.27]}
                                scale={[2.94, 2.86, 2.92]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Vase012.geometry}
                                material={materials['Flower Vase_Color']}
                                position={[0.02, 3.03, -0.82]}
                                rotation={[-2.81, 1.07, -1.92]}
                                scale={[3.82, 3.42, 3.43]}
                            />
                        </group>
                        <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials['Material.001']} />
                        <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials['Material.002']} />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Sphere.geometry}
                            material={materials['Material.003']}
                            position={[1.14, -0.01, 0.08]}
                            scale={[0.28, 0.22, 0.28]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Sphere001.geometry}
                            material={materials['Material.003']}
                            position={[0, -0.01, -0.65]}
                            scale={[0.28, 0.22, 0.28]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Sphere002.geometry}
                            material={materials['Material.003']}
                            position={[-0.48, -0.01, 0.75]}
                            scale={[0.28, 0.22, 0.28]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane005.geometry}
                            material={nodes.Plane005.material}
                            position={[-0.59, -0.01, 0.09]}
                            rotation={[-Math.PI, 0.72, -Math.PI]}
                            scale={0.94}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane009.geometry}
                            material={nodes.Plane009.material}
                            position={[0.53, -0.01, 1.09]}
                            rotation={[0, 0.66, 0]}
                            scale={0.85}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane010.geometry}
                            material={nodes.Plane010.material}
                            position={[0.7, -0.01, -1.06]}
                            rotation={[0, 1.06, 0]}
                            scale={0.95}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane004.geometry}
                            material={materials['Material.005']}
                            position={[0.26, 0.04, -0.66]}
                            rotation={[0, 0, -Math.PI]}
                            scale={[0.35, 0.53, 0.13]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane006.geometry}
                            material={materials['Material.005']}
                            position={[0.32, 0.05, -0.12]}
                            rotation={[0, 0, -Math.PI]}
                            scale={[0.35, 0.53, 0.13]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane007.geometry}
                            material={materials['Material.006']}
                            position={[0.34, 0.29, -0.08]}
                            rotation={[2.92, 0, Math.PI]}
                            scale={[0.35, 0.53, 0.13]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane008.geometry}
                            material={materials['Material.007']}
                            position={[0.31, 0.05, -0.04]}
                            rotation={[-0.61, 0, -Math.PI]}
                            scale={[0.29, 0.43, 0.11]}
                        />
                    </group>
                </group>
            </group>
        );
    }
}

useGLTF.preload(process.env.PUBLIC_URL + '/newermodels/task154.glb');
useGLTF.preload(process.env.PUBLIC_URL + '/newermodels/progress.glb');
useGLTF.preload(process.env.PUBLIC_URL + '/newermodels/complete.glb');

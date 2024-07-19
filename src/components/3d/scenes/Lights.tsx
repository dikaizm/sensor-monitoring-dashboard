import {
    // MutableRefObject, 
    useRef
  } from "react";
  import {
    DirectionalLight,
    PointLight,
    // DirectionalLightHelper,
    // Object3D,
    // PointLightHelper
  } from "three";
  // import { useHelper } from "@react-three/drei";
  
  export default function Lights() {
    const refLight1 = useRef<PointLight>(null);
    const refLight2 = useRef<DirectionalLight>(null);
    const refLight3 = useRef<DirectionalLight>(null);
  
    // useHelper(refLight1 as MutableRefObject<Object3D>, PointLightHelper, 5);
    // useHelper(refLight2 as MutableRefObject<Object3D>, DirectionalLightHelper, 5);
    // useHelper(refLight3 as MutableRefObject<Object3D>, DirectionalLightHelper, 5);
  
    return (
      <>
        <ambientLight intensity={0.3} />
        <directionalLight
          ref={refLight3}
          castShadow
          position={[200, 100, 20]}
          intensity={2}
          shadow-mapSize-shadowMapWidth={1024}
          shadow-mapSize-shadowMapHeight={1024}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={-50}
          shadow-camera-bottom={10}
          shadow-camera-far={200}
          shadow-camera-near={0.1}
        />
  
        <directionalLight
          castShadow
          ref={refLight2}
          position={[-100, 120, 150]}
          intensity={0.8}
        />
        <pointLight castShadow ref={refLight1} position={[0, 50, 0]} intensity={20} />
        <spotLight intensity={3} position={[0, 100, 0]} />
      </>
    );
  }
  
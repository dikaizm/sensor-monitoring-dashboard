import { EffectComposer, Outline, Selection } from '@react-three/postprocessing';
import { useRef } from 'react'
import { Group, Object3DEventMap } from 'three';
import ConveyorModel from './Conveyor';
import CameraModel from './Camera';
import UltrasonicModel from './Ultrasonic';
import BoxModel from './Box';

const boxType = {
  PENYIMPANAN_BAHAN_BAKU: 'penyimpanan_bahan_baku',
  PROSES_PENGGILINGAN: 'proses_penggilingan',
  RAK_PENYIMPANAN_PENGERINGAN: 'rak_penyimpanan_pengeringan',
  PROSES_PENCETAKAN: 'proses_pencetakan',
  RAK_PENYIMPANAN_PENGERINGAN_2: 'rak_penyimpanan_pengeringan_2',
  PROSES_PENCETAKAN_2: 'proses_pencetakan_2',
  RAK_PENYIMPANAN_PENGERINGAN_3: 'rak_penyimpanan_pengeringan_3',
  PROSES_PEMBAKARAN: 'proses_pembakaran',
}

type ModelGroupType = {
  position?: [number, number, number];
}

export default function ModelGroup({ position = [0, 0, 0] }: ModelGroupType) {

  const ref = useRef<Group<Object3DEventMap> | null>(null);

  return (
    <group ref={ref} position={position} rotation={[0, Math.PI / 2, 0]}>
      <Selection>
        <EffectComposer
          enabled
          multisampling={8}
          autoClear={false}
        >
          <Outline
            visibleEdgeColor={0x0e4d92}
            edgeStrength={60}
            width={800}
            pulseSpeed={0.15}
            hiddenEdgeColor={0x0e4d92}
          />
        </EffectComposer>

        {/* Model */}
        <group position={[100, 0, 0]}>
          <ConveyorModel keyId={'conveyor'} />
          <CameraModel keyId={'camera'} position={[0, 62, 0]} />
          <UltrasonicModel keyId={'ultrasonic'} position={[-13, 62, -70]} />
        </group>

        <group position={[0, 0, 0]}>
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-100, 0, -300]} scale={[80, 5, 80]} />
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-100, 0, -205]} />
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-100, 0, 0]} scale={[100, 5, 300]} />
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-90, 5, 0]} scale={[80, 5, 80]} color='lightgrey' />
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-100, 0, 245]} scale={[100, 5, 180]} />
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-90, 5, 195]} scale={[80, 5, 80]} color='lightgrey' />
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-10, 0, 390]} scale={[280, 5, 100]} />
          <BoxModel keyId={boxType.PENYIMPANAN_BAHAN_BAKU} position={[-10, 5, 380]} scale={[80, 5, 80]} color='lightgrey' />
        </group>

      </Selection>
    </group>
  )
}

import { useEffect, useState } from 'react';
import { Select } from '@react-three/postprocessing';
import Model from './Model';

interface UltrasonicType extends Model3DType {
  keyId: string;
}

import labelIdle from "@assets/panel/idle/ultrasonic.svg"
import labelRunning from "@assets/panel/running/ultrasonic.svg"
import labelWarning from "@assets/panel/warning/ultrasonic.svg"
import { useModel3DLabel } from '@/util/handleModel3DLabel';
import { Model3DLabel2 } from '../tooltip/Model3DLabel';
import { useToggleWindow } from '@/context/utils/windowContext';

const statusSvg: StatusSvgType = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function UltrasonicModel({ keyId, position, rotation, scale, clickable = true }: UltrasonicType) {
  const { windowState, windowDispatch } = useToggleWindow()
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = '/assets/model_3d/ultrasonic/ultrasonic.mtl'
  const objPath = '/assets/model_3d/ultrasonic/ultrasonic.obj'

  useEffect(() => {
    if (windowState[keyId]) {
      setIsHover(true)
    } else {
      setIsHover(false)
    }
  }, [windowState, keyId])

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={() => {
          setIsHover(!isHover)
          clickable && windowDispatch({ type: keyId })
        }}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => {
          if (!windowState[keyId]) setIsHover(false)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <Model3DLabel2
          onHover={setIsHover}
          label={useModel3DLabel(keyId, statusSvg)}
          position={[0, 16, 0]}
          size={80}
          keyId={keyId}
        />
      </mesh >
    </Select>
  )
}
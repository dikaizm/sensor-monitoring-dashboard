import { useEffect, useState } from 'react';
import { Select } from '@react-three/postprocessing';
import Model from './Model';

interface CameraType extends Model3DType {
  keyId: string;
}

import labelIdle from "@assets/panel/idle/camera.svg"
import labelRunning from "@assets/panel/running/camera.svg"
import labelWarning from "@assets/panel/warning/camera.svg"
import { useModel3DLabel } from '@/util/handleModel3DLabel';
import { Model3DLabel2 } from '../tooltip/Model3DLabel';
import { useToggleWindow } from '@/context/utils/windowContext';

const statusSvg: StatusSvgType = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function CameraModel({ keyId, position, rotation, scale, clickable = true }: CameraType) {
  const { windowState, windowDispatch } = useToggleWindow()
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = '/assets/model_3d/camera/camera.mtl'
  const objPath = '/assets/model_3d/camera/camera.obj'

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
          position={[0, 30, 0]}
          size={100}
          keyId={keyId}
        />
      </mesh >
    </Select>
  )
}
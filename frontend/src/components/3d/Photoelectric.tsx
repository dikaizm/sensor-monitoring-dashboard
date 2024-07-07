import { useState } from 'react';
import { Select } from '@react-three/postprocessing';
import Model from './Model';

interface PhotoelectricType extends Model3DType {
  keyId: string;
}

import labelIdle from "@assets/panel/idle/photoelectric.svg"
import labelRunning from "@assets/panel/running/photoelectric.svg"
import labelWarning from "@assets/panel/warning/photoelectric.svg"
import { useModel3DLabel } from '@/util/handleModel3DLabel';
import { Model3DLabel2 } from '../tooltip/Model3DLabel';

const statusSvg: StatusSvgType = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function PhotoelectricModel({ keyId, position, rotation, scale, clickable = true }: PhotoelectricType) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = '/assets/model_3d/photoelectric/photoelectric.mtl'
  const objPath = '/assets/model_3d/photoelectric/photoelectric.obj'

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={() => {
          setIsHover(!isHover)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <Model3DLabel2
          onHover={setIsHover}
          label={useModel3DLabel(keyId, statusSvg)}
          position={[0, 16, 0]}
          size={100}
          keyId={keyId}
        />
      </mesh >
    </Select>
  )
}
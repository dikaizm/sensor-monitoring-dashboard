import { useState } from 'react';
import { Select } from '@react-three/postprocessing';
import Model from './Model';
// import EquipmentLayout from '@/views/Layouts/EquipmentLayout';

// import { useWindowState } from '@/context/WindowStateContext';

interface ConveyorType extends Model3DType {
  keyId: string;
}

import labelIdle from "@assets/panel/idle/conveyor.svg"
import labelRunning from "@assets/panel/running/conveyor.svg"
import labelWarning from "@assets/panel/warning/conveyor.svg"
import { useModel3DLabel } from '@/util/handleModel3DLabel';
import { Model3DLabel2 } from '../tooltip/Model3DLabel';

const statusSvg: StatusSvgType = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function ConveyorModel({ keyId, position, rotation, scale, clickable = true }: ConveyorType) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = '/assets/model_3d/conveyor/conveyor.mtl'
  const objPath = '/assets/model_3d/conveyor/conveyor.obj'

  // const { windowState, toggleWindowState } = useWindowState()

  // useEffect(() => {
  //   if (!windowState[keyId]) setIsHover(false)
  // }, [keyId, windowState])

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={() => {
          setIsHover(!isHover)
          // clickable && toggleWindowState(keyId)
        }}
      // onPointerOver={() => setIsHover(true)}
      // onPointerOut={() => {
      //   if (!windowState[keyId]) setIsHover(false)
      // }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <Model3DLabel2
          onHover={setIsHover}
          label={useModel3DLabel(keyId, statusSvg)}
          position={[0, 80, 60]}
          size={100}
          keyId={keyId}
        />
      </mesh >
    </Select>
  )
}

// type EquipmentDetailProps = {
//   data: VDCDataProps;
//   type: string;
// }

// /**
//  * Component
//  * 
//  * @param {Object} data - Equipment data containing information about the equipment.
//  * @param {string} [type="tooltip" | type="window" | type="overview"] - Type of display, either "tooltip" or "window" or "overview".
//  * @example
//  * // Example usage of EquipmentDetail as a tooltip
//  * <EquipmentDetail data={equipmentData} type="tooltip" />
//  * 
// */
// export function VDCEquipmentDetail({ data, type }: EquipmentDetailProps) {
//   return (
//     <EquipmentLayout data={[
//       data.tag?.BilletLength,
//       data.tag?.['CCS_E1_PLC_Cabinet_PointIO:3:I.Ch0Data'],
//       data.tag?.LevelMetal9F,
//       data.tag?.['CM_E7_Cooling_Water:1:I.Ch0Data'],
//       data.tag?.SpeedCasting,
//       data.tag?.['LSYS_E2_IO_Cabinet_Launder:3:I.Ch0Data'],
//       data.tag?.LevelMetal10F,
//       data.tag?.['CM_E5_Casting_Gas_Cabinet:1:I.Ch0Data'],
//     ]} type={type} />
//   )
// }
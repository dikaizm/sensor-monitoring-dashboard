import "./tooltip.scss"

import { memo } from "react";
import { Html } from "@react-three/drei"
import { useToggleWindow } from "@/context/utils/windowContext";

interface Model3DLabel2Type {
  keyId: string;
  label: string;
  position?: [number, number, number];
  size?: number;
  onHover?: (state: boolean) => void;
  clickable?: boolean;
}

export function NonModel3DLabel2({ keyId, label, position = [0, 100, 0], size = 100, onHover, clickable = true }: Model3DLabel2Type) {

  const { windowState, windowDispatch } = useToggleWindow()

  return (
    <Html
      distanceFactor={size}
      position={position}
      center
      zIndexRange={[20, 0]}
    >
      <button
        className={'container-tooltip' + " " +
          (clickable ? "clickable" : "")}

        onPointerOver={() => onHover && onHover(true)}
        onPointerOut={() => !windowState[keyId] && onHover && onHover(false)}
        onClick={() => {
          onHover && onHover(true)
          clickable && windowDispatch({ type: keyId })
        }}
      >
        <div className="relative w-full h-full">
          <div className="w-80">
            <img src={label} alt="" />
          </div>
        </div>
      </button>
    </Html>
  )
}

const areEqual = (prev: Model3DLabel2Type, next: Model3DLabel2Type) => {
  return prev.label === next.label
}

export const Model3DLabel2 = memo(NonModel3DLabel2, areEqual)

export function NonModel3DLabelText({ keyId, label, position = [0, 100, 0], size = 100, onHover, clickable = true }: Model3DLabel2Type) {

  const { windowState, windowDispatch } = useToggleWindow()

  return (
    <Html
      distanceFactor={size}
      position={position}
      center
      zIndexRange={[20, 0]}
    >
      <button
        className={'container-tooltip' + " " +
          (clickable ? "clickable" : "")}

        onPointerOver={() => onHover && onHover(true)}
        onPointerOut={() => !windowState[keyId] && onHover && onHover(false)}
        onClick={() => {
          onHover && onHover(true)
          clickable && windowDispatch({ type: keyId })
        }}
      >
        <div className="relative w-full h-full">
          <div className="px-6 py-4 bg-slate-500 h-fit w-fit rounded-3xl">
            <span className="text-3xl font-semibold text-white">{label}</span>
          </div>
        </div>
      </button>
    </Html>
  )
}

const areEqualLabelText = (prev: Model3DLabel2Type, next: Model3DLabel2Type) => {
  return prev.label === next.label
}

export const Model3DLabelText = memo(NonModel3DLabelText, areEqualLabelText)
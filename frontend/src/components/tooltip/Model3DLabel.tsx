import "./tooltip.scss"

import { JSXElementConstructor, memo } from "react";
import { Html } from "@react-three/drei"
import { useWindowState } from "@/context/WindowStateContext";
import { CircleIndicator } from "../icons/IconCard";

interface Model3DLabel2Type {
  keyId: string;
  label: string;
  position?: [number, number, number];
  size?: number;
  onHover?: (state: boolean) => void;
  clickable?: boolean;
}

interface Model3DLabelType {
  icon: JSXElementConstructor<IconType>;
  position?: [number, number, number];
  size?: number;
  onHover?: (state: boolean) => void;
  onClick?: {
    clickState: boolean;
    setClick: (state: boolean) => void;
    clickable: boolean;
  };
  showStatus?: boolean;
  children: string;
}

export default function Model3DLabel({ icon: Icon, position = [0, 100, 0], size = 100, onHover, onClick, children, showStatus = true }: Model3DLabelType) {

  return (
    <Html
      distanceFactor={size}
      position={position}
      center
      zIndexRange={[20, 0]}
    >
      <div
        className={'container-tooltip label' + " " +
          (onClick?.clickable ? "clickable" : "") + " " +
          (!showStatus ? "disabled" : "enabled")}

        onPointerOver={() => onHover && onHover(true)}
        onPointerOut={() => onHover && onHover(false)}
        onClick={() => {
          onClick?.clickable && onClick?.setClick(!onClick?.clickState)
        }}
      >
        <Icon className="w-12 h-12 icon-tooltip" />
        <div className="label-tooltip">
          <span>{children}</span>

          {showStatus && <CircleIndicator className="w-3 text-green-500" />}
        </div>
      </div>
    </Html>
  )
}

export function NonModel3DLabel2({ keyId, label, position = [0, 100, 0], size = 100, onHover, clickable = true }: Model3DLabel2Type) {

  const { windowState, toggleWindowState } = useWindowState()

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
          clickable && toggleWindowState(keyId)
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
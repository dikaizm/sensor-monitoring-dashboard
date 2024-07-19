import { useRef } from "react";
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";

interface GroundProps {
  position?: [number, number];
  size?: number;
}

/**
 * Represents a ground element.
 * @param {Array.<number>} position [x, y] - The position of the ground in 3D space.
 * @returns {JSX.Element} A ground element.
 */
export default function Ground({ position = [0, 0], size = 500 }: GroundProps): JSX.Element {
  const globalPosition: [number, number, number] = [position[0], -0.15, position[1]]

  const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null)

  return (
    <group position={globalPosition}>
      <mesh
        ref={ref}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry attach="geometry" args={[size, size]} />
        <shadowMaterial attach="material" opacity={60} />
        <meshPhongMaterial attach="material" color={0x393939} />
        {/* <meshStandardMaterial attach="material" color={0x393939} /> */}
      </mesh>

      <mesh position={[0, 0.2, 0]}>
        <gridHelper args={[size, 40, 0x3B404B, 0x3B404B]} />
      </mesh>
    </group>
  )
}
import { Model3DLabelText } from "../tooltip/Model3DLabel";

type BoxType = {
    keyId: string;
    label?: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
}

export default function BoxModel({ keyId, label, position = [0, 0, 0], scale = [100, 5, 100], rotation = [0, 0, 0], color }: BoxType) {
    let meshColor = 0x5D5D5D;

    if (color == 'grey') {
        meshColor = 0x5D5D5D;
    } else if (color == 'lightgrey') {
        meshColor = 0x7B7B7B;
    }

    return (
        <mesh key={keyId} position={position} rotation={rotation}>
            <boxGeometry args={scale} />
            <meshStandardMaterial color={meshColor} />

            {label && (
                <Model3DLabelText
                    label={label}
                    position={[0, 20, 0]}
                    size={200}
                    keyId={keyId}
                />
            )}
        </mesh>
    );
}
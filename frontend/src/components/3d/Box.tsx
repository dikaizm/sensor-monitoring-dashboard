type BoxType = {
    keyId: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
}

export default function BoxModel({ keyId, position = [0, 0, 0], scale = [100, 5, 100], rotation = [0, 0, 0], color }: BoxType) {
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
        </mesh>
    );
}
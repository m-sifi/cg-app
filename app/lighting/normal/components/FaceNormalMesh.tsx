import { Box, Edges, Line } from "@react-three/drei"


const FaceNormalMesh = () => {

    const size = 8;
    return (
        <>
            <group>
                <Box args={[8, 8, 8]}>
                    <meshStandardMaterial color={'white'} />
                    <Edges
                        scale={1}
                        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=1size degrees)
                        color="black"
                    />
                </Box >
            </group>
            <group>
                <Line points={[[0, 0, 0], [0, 0, size]]} color={'red'} />
                <Line points={[[0, 0, 0], [0, size, 0]]} color={'green'} />
                <Line points={[[0, 0, 0], [size, 0, 0]]} color={'blue'} />
                <Line points={[[0, 0, 0], [0, 0, -size]]} color={'red'} />
                <Line points={[[0, 0, 0], [0, -size, 0]]} color={'green'} />
                <Line points={[[0, 0, 0], [-size, 0, 0]]} color={'blue'} />
            </group>
        </>)
}

export { FaceNormalMesh }
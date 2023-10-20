import { KatexEquation } from "@/components/math/Equation";
import { Box } from "@radix-ui/themes";

interface MatrixProps {
    matrix: string
    axis: string
}

const Matrix = ({ matrix, axis }: MatrixProps) => {
    const color = axis === 'X' ? 'text-red-400' : axis === 'Y' ? 'text-green-400' : 'text-blue-400';
    return (
        <Box className={`${color} select-none`}>
            <KatexEquation text={matrix} />
            <p className='text-center'>
                <KatexEquation text={`\\text{${axis}-axis}`} />
            </p>
        </Box>
    )
};

export { Matrix }
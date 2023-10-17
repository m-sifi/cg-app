
interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button className='w-48 rounded-md bg-neutral-600 px-6 py-3 transition-colors hover:bg-neutral-500' onClick={onClick}>
            {children}
        </button>
    )
}

export { Button }
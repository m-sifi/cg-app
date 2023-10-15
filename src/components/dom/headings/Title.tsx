interface HeadingProps {
  children?: any
}

const Title = ({ children }: HeadingProps) => {
  return <h1 className='text-center text-4xl font-semibold'>{children}</h1>
}

export { Title }

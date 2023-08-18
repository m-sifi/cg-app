interface GridLayoutProps {
  children?: any
}

const GridLayout = ({ children }: GridLayoutProps) => {
  return <div className='absolute inset-0 grid grid-cols-content grid-rows-1 gap-4'>{children}</div>
}

export { GridLayout }

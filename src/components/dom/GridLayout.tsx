interface GridLayoutProps {
  children?: any
}

const GridLayout = ({ children }: GridLayoutProps) => {
  return <div className='absolute inset-0 top-12 grid grid-cols-content grid-rows-1 gap-4 bg-slate-50'>{children}</div>
}

export { GridLayout }

import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu'
import { ShadowIcon } from '@radix-ui/react-icons'
import { forwardRef } from 'react'

interface NavListItemProps {
  title: string
  children?: any
  className?: string
}

interface ListItemLinkProps {
  className?: string
  children?: any
  title: string
  href: string
}

interface NavListProps {
  children?: any
}

const Logo = () => {
  return (
    <a href='#' className='mr-auto flex items-center justify-center space-x-2 px-2'>
      <span className='text-lg font-semibold'>cg.app</span>
    </a>
  )
}

const NavList = ({ children }: NavListProps) => {
  return (
    <ul className='m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3'>
      {children}
    </ul>
  )
}

// eslint-disable-next-line react/display-name
const NavListItem = ({ title, children, className }: NavListItemProps) => {
  return (
    <RadixNavigationMenu.Item>
      <RadixNavigationMenu.Trigger
        className={`select-none rounded-md px-2 py-3 text-sm font-semibold leading-none outline-none transition-colors delay-100 hover:bg-gray-200 ${className}`}
      >
        {title}
      </RadixNavigationMenu.Trigger>
      <RadixNavigationMenu.Content className='absolute left-0 top-0 w-full sm:w-auto'>
        {children}
      </RadixNavigationMenu.Content>
    </RadixNavigationMenu.Item>
  )
}

// eslint-disable-next-line react/display-name
const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <RadixNavigationMenu.Link asChild>
        <a
          className='block select-none rounded-md p-3 text-sm leading-none no-underline outline-none hover:bg-gray-200'
          {...props}
          ref={forwardedRef}
        >
          <div className='mb-1 font-semibold leading-tight'>{title}</div>
          <p className='leading-snug'>{children}</p>
        </a>
      </RadixNavigationMenu.Link>
    </li>
  ),
)

function NavigationMenu() {
  return (
    <RadixNavigationMenu.Root className='relative z-10 flex w-screen justify-center'>
      <RadixNavigationMenu.List className='m-0 grid w-screen list-none grid-cols-nav justify-center gap-2 rounded-md bg-white p-2 shadow-md'>
        <Logo />
        <div className='absolute top-0 flex w-screen justify-center p-1'>
          <NavListItem title={'Vectors'} className='hidden'>
            <NavList>
              <ListItemLink title='Dot Product' href='/primitives/docs/overview/introduction'>
                Build high-quality, accessible design systems and web apps.
              </ListItemLink>
              <ListItemLink title='Cross Product' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
            </NavList>
          </NavListItem>
          <NavListItem title={'Matrices'}>
            <NavList>
              <ListItemLink title='Translation' href='/matrices/translation'>
                Build high-quality, accessible design systems and web apps.
              </ListItemLink>
              <ListItemLink title='Scaling' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
              <ListItemLink title='Rotation' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
            </NavList>
          </NavListItem>
          <NavListItem title={'Quaternions'}>
            <NavList>
              <ListItemLink title='Rotation' href='/primitives/docs/overview/introduction'>
                Build high-quality, accessible design systems and web apps.
              </ListItemLink>
            </NavList>
          </NavListItem>
          <NavListItem title={'Transforms'}>
            <NavList>
              <ListItemLink title='Model Matrix' href='/primitives/docs/overview/introduction'>
                Build high-quality, accessible design systems and web apps.
              </ListItemLink>
              <ListItemLink title='View Matrix' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
              <ListItemLink title='Projection Matrix' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
            </NavList>
          </NavListItem>
          <NavListItem title={'Lighting'}>
            <NavList>
              <ListItemLink title='Vertex' href='/primitives/docs/overview/introduction'>
                Build high-quality, accessible design systems and web apps.
              </ListItemLink>
              <ListItemLink title='Normals' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
              <ListItemLink title='Lighting Basics' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
              <ListItemLink title='Lighting Models' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
              <ListItemLink title='Lighting Types' href='/primitives/docs/overview/getting-started'>
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItemLink>
            </NavList>
          </NavListItem>
          <NavListItem title={'Textures'}></NavListItem>

          <RadixNavigationMenu.Indicator className=''>
            <div className='' />
          </RadixNavigationMenu.Indicator>
        </div>
      </RadixNavigationMenu.List>

      <div className='absolute left-0 top-11 flex w-full justify-center' style={{ perspective: '2000px' }}>
        {/* <RadixNavigationMenu.Viewport className='relative mt-3 w-full origin-center overflow-hidden rounded-md bg-white transition-all h-radix-navigation-menu-viewport' /> */}
        <RadixNavigationMenu.Viewport className='relative mt-[4px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 radix-state-closed:animate-scaleOut radix-state-open:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]' />
      </div>
    </RadixNavigationMenu.Root>
  )
}

export { NavigationMenu }

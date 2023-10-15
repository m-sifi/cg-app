import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Box, Link as RadixLink, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { NavigationLink } from './common/NavigationLink'

const VectorNavigation = () => {
  return (
    <>
      <NavigationMenu.Item>
        <Text weight='medium' size='5' color='gray'>
          Vectors
        </Text>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationLink href='/vectors/dot' text='Dot Product' />
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationLink href='/vectors/cross' text='Cross Product' />
      </NavigationMenu.Item>
    </>
  )
}

export { VectorNavigation }

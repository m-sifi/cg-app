import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Box, Text, Link as RadixLink } from '@radix-ui/themes'
import Link from 'next/link'
import { NavigationLink } from './common/NavigationLink'

const QuaternionNavigation = () => {
  return (
    <>
      <NavigationMenu.Item>
        <Text weight='medium' size='5' color='gray'>
          Quaternion
        </Text>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationLink href='/quaternion/rotation' text='Rotation' />
      </NavigationMenu.Item>
    </>
  )
}

export { QuaternionNavigation }

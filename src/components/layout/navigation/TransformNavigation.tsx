import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Text } from '@radix-ui/themes'
import { NavigationLink } from './common/NavigationLink'

const TransformNavigation = () => {
  return (
    <>
      <NavigationMenu.Item>
        <Text weight='medium' size='5' color='gray'>
          Transform
        </Text>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationLink href='/transform/coordinate-system' text='Coordinate System' />
      </NavigationMenu.Item>
    </>
  )
}

export { TransformNavigation }

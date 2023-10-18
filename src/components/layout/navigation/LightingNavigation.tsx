import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Text } from '@radix-ui/themes'
import { NavigationLink } from './common/NavigationLink'

const LightingNavigation = () => {
  return (
    <>
      <NavigationMenu.Item>
        <Text weight='medium' size='5' color='gray'>
          Lighting
        </Text>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationLink href='/lighting/vertex' text='Vertex' />
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationLink href='/lighting/normal' text='Normal' />
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationLink href='/lighting/basic-lighting' text='Basic Lighting' />
      </NavigationMenu.Item>
    </>
  )
}

export { LightingNavigation }

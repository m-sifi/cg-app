import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Text } from '@radix-ui/themes'

const LightingNavigation = () => {
  return (
    <>
      <NavigationMenu.Item>
        <Text weight='medium' size='5' color='gray'>
          Lighting
        </Text>
      </NavigationMenu.Item>
    </>
  )
}

export { LightingNavigation }

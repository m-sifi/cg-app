import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Box, Text } from '@radix-ui/themes'

const Logo = () => {
  return (
    <>
      <NavigationMenu.Item>
        <Box width='100%'>
          <Text as='div' weight='bold' size='7' align='center' color='gray' my='1' className='select-none'>
            cg.app
          </Text>
        </Box>
      </NavigationMenu.Item>
    </>
  )
}

export { Logo }

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Text, Switch, Flex } from '@radix-ui/themes'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  const toggleTheme = (dark: boolean) => {
    if (dark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <>
      <NavigationMenu.Item className='mt-auto'>
        <Box width='100%'>
          <Text as='label' size='2'>
            <Flex gap='2'>
              <Switch
                size='3'
                defaultChecked
                onCheckedChange={(e) => {
                  toggleTheme(e)
                }}
              />{' '}
              Sync settings
            </Flex>
          </Text>
        </Box>
      </NavigationMenu.Item>
    </>
  )
}

export { ThemeToggle }

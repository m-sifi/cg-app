import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, TextField } from '@radix-ui/themes'

const SearchBar = () => {
    return (
        <>
            <NavigationMenu.Item>
                <Box width='100%'>
                    <TextField.Root size='3' className='w-full'>
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Search Examples" />
                    </TextField.Root>
                </Box>
            </NavigationMenu.Item>
        </>
    )
}

export { SearchBar }

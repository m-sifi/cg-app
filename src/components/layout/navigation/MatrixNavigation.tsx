import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Box, Link as RadixLink, Text } from "@radix-ui/themes";
import Link from "next/link";
import { NavigationLink } from "./common/NavigationLink";

const MatrixNavigation = () => {
    return (
        <>
            <NavigationMenu.Item><Text weight='medium' size='5' color='gray'>Matrix</Text></NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationLink href='/matrices/translation' text='Translation' />
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationLink href='/matrices/rotation' text='Rotation' />
            </NavigationMenu.Item>
            <NavigationMenu.Item>
                <NavigationLink href='/matrices/scaling' text='Scaling' />
            </NavigationMenu.Item>
        </>
    );
}

export { MatrixNavigation };
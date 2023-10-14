import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Text } from "@radix-ui/themes";

const TransformNavigation = () => {
    return (
        <>
            <NavigationMenu.Item><Text weight='medium' size='5' color='gray'>Transform</Text></NavigationMenu.Item>
        </>
    );
}

export { TransformNavigation };
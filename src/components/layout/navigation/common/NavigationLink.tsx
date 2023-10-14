import { Link as RadixLink, Box } from "@radix-ui/themes";
import Link from "next/link";

interface NavigationLinkProps {
    href: string;
    text: string;
}

const NavigationLink = ({ href, text }: NavigationLinkProps) => {
    return (
        <RadixLink color='gray' asChild className="px-4 py-2 rounded-md hover:bg-neutral-600 transition-colors">
            <Box width='100%'>
                <Link href={href}>{text}</Link>
            </Box>
        </RadixLink>
    )
}

export { NavigationLink };
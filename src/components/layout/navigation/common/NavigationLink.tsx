import { Link as RadixLink, Box } from '@radix-ui/themes'
import Link from 'next/link'

interface NavigationLinkProps {
  href: string
  text: string
}

const NavigationLink = ({ href, text }: NavigationLinkProps) => {
  return (
    <Link href={href} replace>
      <RadixLink color='gray' asChild className='rounded-md px-4 py-2 transition-colors hover:bg-neutral-600'>
        <Box width='100%'>
          {text}
        </Box>
      </RadixLink>
    </Link>
  )
}

export { NavigationLink }

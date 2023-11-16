import Link from 'next/link'
import { Container } from './container'
// import { useAppContext } from './contexts/appContext'
import { SocialLinks } from '../partials/social-links'

export const Footer = () => {
	// const { publication } = useAppContext()
	return (
		<footer className="bg-white dark:bg-black text-black dark:bg-black w-full border-t mt-20 py-10 md:py-12 dark:border-neutral-800">
			<Container className="flex items-center justify-between gap-5 px-5">
				<SocialLinks />										
			</Container>
		</footer>
	)
}

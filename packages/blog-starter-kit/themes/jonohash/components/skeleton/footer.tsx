import { Container } from './container'
import { SocialLinks } from '../partials/social-links'

export const Footer = () => {
	return (
		<footer className="bg-white dark:bg-black text-black dark:bg-black w-full border-t dark:border-neutral-800 mt-20 py-10 md:py-12">
			<Container className="flex items-center justify-between gap-5 px-5">
				<SocialLinks />
			</Container>
		</footer>
	)
}

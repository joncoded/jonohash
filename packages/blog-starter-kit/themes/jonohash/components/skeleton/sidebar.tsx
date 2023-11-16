import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PublicationNavbarItem } from '../../generated/graphql'
import { Button } from '../partials/button'
import { useAppContext } from '../utilities/contexts/appContext'
import CloseSVG from '../utilities/icons/svgs/CloseSVG'
import { PublicationLogo } from '../partials/publication-logo'
import { SocialLinks } from '../partials/social-links'

type Props = {
	toggleSidebar: () => void
	navbarItems: (PublicationNavbarItem & { url: string })[]
}

function PublicationSidebar(props: Props) {
	const { toggleSidebar, navbarItems } = props
	const [isMounted, setIsMounted] = useState(false)
	const { publication } = useAppContext()
	const hasSocialLinks = !Object.values(publication.links!).every((val) => val === '')

	/* dark mode toggle */
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {    
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  /* dark mode toggle */

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<DialogPrimitive.Root open>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay
					className={`fixed inset-0 z-50 bg-slate-900 opacity-0 transition-opacity duration-300 ease-out ${
						isMounted && 'opacity-50'
					}`}
				/>
				<DialogPrimitive.Content
					onEscapeKeyDown={() => {
						toggleSidebar()
					}}
					onPointerDownOutside={() => {
						toggleSidebar()
					}}
					className={`${						
						!isMounted ? '-translate-x-96' : 'translate-x-0'
					} fixed bottom-0 left-0 top-0 z-50 flex w-80 transform flex-col bg-white shadow-2xl duration-300 ease-out dark:border-neutral-800 dark:bg-neutral-950`}
				>
					<div className="blog-sidebar-header w-full shrink-0 py-5">
						<div className="flex items-center justify-between px-5">
							<div className="!text-xl">
								<PublicationLogo isSidebar />
							</div>

							<DialogPrimitive.Close asChild>
								<Button
									type="outline"
									label=""
									icon={<CloseSVG className="h-5 w-5 fill-current" />}
									className="rounded-xl !border-transparent !px-3 !py-2 hover:bg-neutral-800 dark:text-white"
									onClick={() => {
										toggleSidebar()
									}}
								/>
							</DialogPrimitive.Close>
						</div>

						<div className="px-5 pt-5 pb-0">
							<Button	
								type="outline"
								label={theme === 'dark' ? 'switch to lite mode' : 'switch to dark mode'}
								icon={ theme === 'dark' ? '☀️' : '🌙'}
								className="rounded-xl border-transparent bg-gray-400 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-black text-white dark:text-gray-950 dark:hover:text-white"
								onClick={handleTheme}
							/>
						</div>
					</div>

					<div className="px-5">
						<section className="mb-10">
							<ul className="flex flex-col gap-2 text-slate-700 dark:text-white">
								<li>
									<Link
										href="/"
										className="transition-200 block truncate text-ellipsis whitespace-nowrap rounded p-2 px-3 transition-colors hover:bg-slate-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
									>
										Home
									</Link>
								</li>
								{navbarItems.map((item) => (
									<li key={item.url}>
										<Link
											href={item.url}
											className="transition-200 block truncate text-ellipsis whitespace-nowrap rounded p-2 px-3 transition-colors hover:bg-slate-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</section>						
						<SocialLinks isSidebar />
					</div>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	)
}

export default PublicationSidebar

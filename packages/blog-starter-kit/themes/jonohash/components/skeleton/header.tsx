import { useState } from 'react'
import { useTheme } from 'next-themes'
import { PublicationNavbarItem } from '../../generated/graphql'
import { Button } from '../partials/button'
import { Container } from './container'
import { useAppContext } from '../utilities/contexts/appContext'
import { PublicationLogo } from '../partials/publication-logo'
import PublicationSidebar from './sidebar'
import HamburgerSVG from '../utilities/icons/svgs/HamburgerSVG'
import { Search } from '../partials/searchbar'
import Skip from '../partials/skip'

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0
}

export const Header = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>()
	const { publication } = useAppContext()
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl)

	/* dark mode toggle */
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {    
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  /* dark mode toggle */

	/* sidebar toggle */
	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility)
	}
	/* sidebar toggle */

	return (
		<header className="fixed top-0 z-40 w-full shadow-xl bg-black bg-gradient-to-t from-black to-gray-700 py-5">
			<Skip />
			<Container className="flex justify-between items-center gap-5 px-5">				
				<div className="flex items-center gap-5">
					<div>
						<PublicationLogo />
					</div>
					<div className="hidden md:inline">
						<Button	
							type="outline"
							label={theme === 'dark' ? 'lite mode' : 'dark mode'}
							icon={ theme === 'dark' ? '☀️' : '🌙'}
							className="rounded-xl border-transparent !px-3 !py-2 text-white hover:bg-slate-900 dark:hover:bg-neutral-800"
							onClick={handleTheme}
						/>
					</div>
					<div>
						<Button
							type="outline"
							label="menu"
							icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
							className="rounded-xl border-transparent !px-3 !py-2 text-white hover:bg-slate-900 dark:hover:bg-neutral-800"
							onClick={toggleSidebar}
						/>
						{isSidebarVisible && (
							<PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
						)}
					</div>
				</div>
				<div className="w-min-32">
					<Search />
				</div>
			</Container>
		</header>
	)
}

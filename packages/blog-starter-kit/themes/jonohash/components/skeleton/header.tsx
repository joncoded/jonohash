import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { useTheme } from 'next-themes'
import { PublicationNavbarItem } from '../../generated/graphql';
import { Button } from '../partials/button';
import { Container } from './container';
import { useAppContext } from '../utilities/contexts/appContext';
import { PublicationLogo } from '../partials/publication-logo';
import PublicationSidebar from './sidebar';
import HamburgerSVG from '../utilities/icons/svgs/HamburgerSVG';
import { Search } from '../partials/searchbar';
import Skip from '../partials/skip';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 2);
	const hiddenItems = navbarItems.slice(2);

	/* dark mode toggle */
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {    
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  /* dark mode toggle */

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const navList = (
		<ul className="flex flex-row items-center gap-2 text-white">

			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
					>
						{item.label}
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>

					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="transition-200 block rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white">
								more
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="w-48 rounded border border-gray-300 bg-white text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
								align="end"
								sideOffset={5}
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="transition-200 block truncate p-2 transition-colors hover:bg-slate-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>

				</li>
			)}
		</ul>
	);

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
					<div>
						{navList}
					</div>
				</div>
				<div>
					<Search />
				</div>
			</Container>
		</header>
	);
};

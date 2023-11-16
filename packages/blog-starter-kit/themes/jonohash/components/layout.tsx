import { Analytics } from './analytics';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';
import { ThemeProvider } from './dark-mode';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			<div className="min-h-screen bg-white dark:bg-neutral-950">
				<ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>
					{children}
				</ThemeProvider>
			</div>
			<Analytics />
			<Integrations />
		</>
	);
};

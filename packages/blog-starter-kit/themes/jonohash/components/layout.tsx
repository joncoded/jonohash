import { Analytics } from './utilities/analytics'
import { Integrations } from './utilities/integrations'
import { Meta } from './skeleton/meta'
import { Scripts } from './utilities/scripts'
import { ThemeProvider } from './utilities/modes/dark-mode'

type Props = {
	children: React.ReactNode
}

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
	)
}

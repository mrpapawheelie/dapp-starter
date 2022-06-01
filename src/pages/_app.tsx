import 'tailwindcss/tailwind.css'
import { APP_NAME } from '@/lib/consts'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'


const { chains, provider } = configureChains(
	[chain.polygon],
	[apiProvider.infura(process.env.NEXT_PUBLIC_INFURA_ID), apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

const App = ({ Component, pageProps }) => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider 
				showRecentTransactions={true}
				theme={darkTheme({
				accentColor: '#7b3fe4',
				accentColorForeground: 'white',
				borderRadius: 'small',
				fontStack: 'system',
			  })} 
			  	chains={chains}
				coolMode>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default App

import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'App Name Here',
	description: 'App Description',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<Provider>
				<body className={inter.className}>{children}</body>
			</Provider>
		</html>
	);
}

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

const Layout = ({ children }) => {
	return (
		<main className='root mx-auto text-2xl'>
			<Header />
			{children}
			<Footer />
		</main>
	);
};

export default Layout;

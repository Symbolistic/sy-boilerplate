import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import React from 'react';

const Home = () => {
	return (
		<main>
			<Hero />
			<Pricing />
			<FAQ />
			<CTA />
		</main>
	);
};

export default Home;

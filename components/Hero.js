'use client';

import Image from 'next/image';
import React from 'react';
import HeroImage from '../styles/assets/hero-img.webp';
import { useRouter } from 'next/navigation';

const Hero = () => {
	const router = useRouter();

	return (
		<div className='hero min-h-screen mb-10'>
			<div className='hero-content flex-col lg:flex-row-reverse'>
				<Image
					src={HeroImage}
					className='max-w-sm rounded-lg shadow-2xl'
					width={300}
					height={300}
					alt='hero-image'
				/>
				<div className='flex flex-col items-center text-center sm:text-left sm:items-start'>
					<h1 className='text-5xl font-bold'>App Name Here</h1>
					<p className='py-6'>
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
					<button
						className='btn btn-primary'
						onClick={() => router.push('/sign-in')}
					>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;

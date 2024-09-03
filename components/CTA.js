'use client';
import { useRouter } from 'next/navigation';

const CTA = () => {
	const router = useRouter();
	return (
		<div
			className='hero min-h-screen'
			style={{
				backgroundImage: 'url(https://wallpapercave.com/wp/wp8623049.png)',
			}}
		>
			<div className='hero-overlay bg-opacity-60'></div>
			<div className='hero-content text-neutral-content text-center'>
				<div className='max-w-md'>
					<h1 className='mb-5 text-5xl font-bold'>
						Boost your app, launch and earn!
					</h1>
					<p className='mb-5'>
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi.
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

export default CTA;

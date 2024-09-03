'use client';

const Pricing = () => {
	return (
		<section
			id='Pricing'
			className='flex flex-col items-center gap-10 pt-10 pb-10 bg-base-200'
		>
			<div className='prose text-center'>
				<h1>Pricing</h1>
				<h2>Save hours of repetitive work and ship faster!</h2>
			</div>
			<div className='flex flex-col items-center gap-10 md:flex-row md:justify-center md:items-stretch'>
				<div className='card bg-base-100 w-96 shadow-xl'>
					<div className='card-body'>
						<h2 className='card-title'>Beginner</h2>
						<h1 className='card-title'>$10</h1>
						<ul className='list-none'>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 1
							</li>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 2
							</li>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 3
							</li>
						</ul>
						<div className='card-actions justify-center mt-5'>
							<button className='btn btn-primary btn-wide'>Buy Now</button>
						</div>
					</div>
				</div>

				<div className='card bg-base-100 w-96 shadow-xl'>
					<div className='card-body'>
						<h2 className='card-title'>Intermediate</h2>
						<h1 className='card-title'>$20</h1>
						<ul className='list-none'>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 1
							</li>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 2
							</li>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 3
							</li>
						</ul>
						<div className='card-actions justify-center mt-5'>
							<button className='btn btn-primary btn-wide'>Buy Now</button>
						</div>
					</div>
				</div>

				<div className='card bg-base-100 w-96 shadow-xl'>
					<div className='card-body'>
						<h2 className='card-title'>Advanced</h2>
						<h1 className='card-title'>$30</h1>
						<ul className='list-none'>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 1
							</li>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 2
							</li>
							<li className='before:content-["✔️"] before:text-primary before:mr-2'>
								Feature 3
							</li>
						</ul>
						<div className='card-actions justify-center mt-5'>
							<button className='btn btn-primary btn-wide'>Buy Now</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pricing;

import React from 'react';

const FAQ = () => {
	return (
		<section id='FAQ' className='bg-base-200 pt-20 pb-20'>
			<div className='container mx-auto'>
				<div className='flex flex-col items-center mb-5'>
					<div className='prose text-center'>
						<h3>FAQ</h3>
						<h1>Frequently Asked Questions</h1>
					</div>
				</div>
				<div className='collapse collapse-plus bg-base-200'>
					<input type='checkbox' name='my-accordion-3' />
					<div className='collapse-title text-xl font-medium'>
						What do I get exactly?
					</div>
					<div className='collapse-content'>
						<p>hello</p>
					</div>
				</div>
				<div className='collapse collapse-plus bg-base-200'>
					<input type='checkbox' name='my-accordion-3' />
					<div className='collapse-title text-xl font-medium'>
						Can you explain the features?
					</div>
					<div className='collapse-content'>
						<p>hello</p>
					</div>
				</div>
				<div className='collapse collapse-plus bg-base-200'>
					<input type='checkbox' name='my-accordion-3' />
					<div className='collapse-title text-xl font-medium'>
						I have another question
					</div>
					<div className='collapse-content'>
						<p>hello</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQ;

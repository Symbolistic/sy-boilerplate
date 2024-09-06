import mongoose from 'mongoose';

export const clearStaleTokens = async () => {
	try {
		const now = new Date();

		// Calculate the time 24 hours ago
		const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

		// Use the collection directly without defining a model
		const result = await mongoose.connection
			.collection('verification_tokens')
			.deleteMany({
				expires: { $lt: twentyFourHoursAgo },
			});

		console.log(`${result.deletedCount} expired tokens deleted`);
	} catch (error) {
		console.error('Error deleting expired tokens:', error);
	}
};

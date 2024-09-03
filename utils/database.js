import mongoose from 'mongoose';

let isConnected = false; // Track connection status

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('MongoDB is already connected');
		return;
	} else {
		try {
			await mongoose.connect(process.env.MONGODB_URI, {
				dbName: 'sy_boilerplate',
			});

			isConnected = true;

			console.log('MongoDB connected');
		} catch (error) {
			console.log(error);
		}
	}
};

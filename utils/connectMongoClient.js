import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export const connectMongoClient = async () => {
	if (!clientPromise) {
		client = new MongoClient(process.env.MONGODB_URI);

		clientPromise = client.connect();
	}

	return clientPromise;
};

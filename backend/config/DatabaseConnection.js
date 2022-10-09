import { MongoClient } from "mongodb";

const databaseConnection = async () => {
    const { CONNECTION_URI, DB_NAME } = process.env;
    const client = new MongoClient(CONNECTION_URI);
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(DB_NAME);

    return { 'db': db, 'client': client };
}

export default databaseConnection;
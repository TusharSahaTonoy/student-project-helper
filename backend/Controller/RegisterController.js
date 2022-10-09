import databaseConnection from "../config/DatabaseConnection.js";
import bcrypt from "bcrypt";



function registerDeveloper(username, password) {

}

const addUser = async function (email, password, type) {
    const { db, client } = await databaseConnection();
    const collection = db.collection('users');
    const salt_rounds = 10;
    const hash_pass = bcrypt.hashSync(password, salt_rounds);
    const insertResult = await collection.insertOne({ "email": email, "password": hash_pass, "type": type });
    if (insertResult.acknowledged) {
        client.close().then(console.log('Connected closed'));
    }
    return insertResult;
}

export { addUser };
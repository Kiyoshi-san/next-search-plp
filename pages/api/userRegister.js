import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default async function (req, res) {
    // Connecting to the cluster
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db();
    const usersCollection = db.collection("users");

    // Inserting an user example
    bcrypt.hash("Teste123", 8, async function (err, hash) {
        if (err) return res.json({ error: true });
        await usersCollection.insertOne({
            name: "kiyoshi",
            email: "kiyoshi@test.com",
            password: hash,
            wishedProducts: [
                "MLB1772697856",
                "MLB1432644284",
                "MLB757208971",
                "MLB1633227397",
            ],
        });
    });

    if (!req.body) {
        res.statusCode = 404;
        res.end("Error");
        return;
    }
    res.json({
        message: "Inserted"
    })
}

import jwt from 'jsonwebtoken';
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

function generateToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        process.env.JWT_SECRET || "somethingsecret",
        {
        //   expira em 30 dias
            expiresIn: "30d",
        }
    );
}

export default async function(req, res) {
    try {
        if (!req.body) {
            res.status(401).send({ message: "Error" });
            return;
        }

        const { email, password } = req.body;

        // Connecting to the cluster
        const client = await MongoClient.connect(process.env.DATABASE_URL);
        const db = client.db();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: email });

        client.close();

        if (user) {
            if (bcrypt.compare(password, user.password)) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user),
                    wishedProducts: user.wishedProducts,
                });
                return;
            }
        }
        res.status(404).send({ message: "Invalid email or password" });
    } catch(error) {
        console.log(error);
    }
}
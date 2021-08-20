import { MongoClient, ObjectId } from "mongodb";

export default async function (req, res) {
    try {
        if(!req.body) {
            res.status(401).send({ message: "Error" })
            return;
        }

        let { idUser, wishedProducts } = req.body;
  
        const client = await MongoClient.connect(process.env.DATABASE_URL);
        const db = client.db();
        const usersCollection = db.collection("users");

        const userUpdate = await usersCollection.update(
            {
                _id: ObjectId(idUser),
            },
            {
                $set: { wishedProducts: wishedProducts },
            }
        );

        const userFind = await usersCollection.findOne({ _id: ObjectId(idUser) })

        client.close();

        if(userFind) {
            res.json(userFind);
            return
        }
        res.status(404).send({ message: "User not found" });
    } catch(error) {
        console.log(error);
    }
}

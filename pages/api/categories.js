export default async function(req, res) {
    try {
        const response = await fetch(`${process.env.API_URL}categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if(data) {
            res.json(data);
            return;
        }
        res.status(401).send({ message: "Error" });        
        res.status(404).send({ message: "No categories found" });        
    } catch(error) {
        console.log(error);
    }
}
// Importing the express library
// Importing the cors library
const express = require("express");
const cors = require("cors");

const app = express();
// Defining the port to 3000, can be changes as per the requirement
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

// Defining the public folder
app.use(express.static("public"));

// adding a get request to the server
app.post("/square", (req, res) => {
    const { num1 } = req.body;
    
    if (typeof num1 !== "number") {
        return res.status(400).json({ error: "Invalid input" });
    }

    const result = num1 * num1;
    res.json({ result });
});

app.get("/pizza", (req, res) => {
    res.sendFile(Path.join(__dirname, "public", "pizza.jpg"));
});

// Starting the server at port 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

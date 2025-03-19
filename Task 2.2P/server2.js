const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.static("public")); 

app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return res.status(400).json({ error: "Invalid input" });
    }

    let result;
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 === 0) {
                return res.status(400).json({ error: "Cannot divide by zero" });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: "Invalid operation" });
    }

    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

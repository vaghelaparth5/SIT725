const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http"); 
const socketio = require("socket.io");

const app = express();
const PORT = 3000;

// Create HTTP server
const server = http.createServer(app);
// Pass server to socket.io
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));



// Serve index2.html at the root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index2.html"));
});

// API endpoint for calculator
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

    // Emit the result to all connected clients via socket
    io.emit('calculation', { num1, num2, operation, result });

    res.json({ result });
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

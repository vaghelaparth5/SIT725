// Connect to socket.io server
const socket = io();

// Listen for random number event
socket.on('number', (num) => {
    console.log('Random number from server:', num);
    document.getElementById('random-number').innerText = num;
});

// Listen for calculation event
socket.on('calculation', (data) => {
    console.log('Calculation event received:', data);
    const broadcastDiv = document.getElementById('broadcast');
    broadcastDiv.innerHTML = `
        <p>${data.num1} ${getSymbol(data.operation)} ${data.num2} = ${data.result}</p>
    `;
});

function getSymbol(operation) {
    switch (operation) {
        case "add": return "+";
        case "subtract": return "-";
        case "multiply": return "x";
        case "divide": return "÷";
        default: return "";
    }
}

async function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;

    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers");
        return;
    }

    const response = await fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num1, num2, operation })
    });

    const data = await response.json();
    if (response.ok) {
        document.getElementById("result").innerText = data.result;
    } else {
        alert(data.error);
    }
}

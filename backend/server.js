const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "API is connected" });
});

app.post("/webhook", (req, res) => {
  try {
    const data = req.body?.data;

    if (typeof data !== "string") {
      return res.status(400).json({ error: 'Invalid payload. Expected {"data":"string"}.' });
    }

    const word = data.split("").sort((a, b) => a.localeCompare(b));

    return res.status(200).json({ word });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

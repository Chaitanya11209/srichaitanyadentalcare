const express = require("express");
const cors = require("cors");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// WhatsApp setup
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", qr => {
  qrcode.generate(qr, { small: true });
  console.log("Scan QR with clinic WhatsApp");
});

client.on("ready", () => {
  console.log("WhatsApp Connected ✅");
});

client.initialize();

// Generate ID
function generateID() {
  return "DC-" + Date.now();
}

// API
app.post("/book", (req, res) => {

  const { name, phone, treatment, date, time } = req.body;

  const id = generateID();

  const message =
`🦷 Sri Chaitanya Dental Care

Appointment Confirmed

ID: ${id}
Patient: ${name}
Treatment: ${treatment}
Date: ${date}
Time: ${time}

📍 Location:
https://maps.google.com/?q=Sri+Chaitanya+Dental+Care`;

  // Send to patient
  client.sendMessage(`91${phone}@c.us`, message);

  // Send to clinic (your number)
  client.sendMessage(`918277090710@c.us`, message);

  res.json({
    status: "success",
    appointment_id: id
  });

});

app.listen(3000, () => {
  console.log("Server running");
});

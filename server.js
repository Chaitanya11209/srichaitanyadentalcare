const express = require("express");
const cors = require("cors");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
app.use(cors());
app.use(express.json());

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

// API
app.post("/book", async (req, res) => {

  const { name, phone, treatment, date, time } = req.body;

  const appointmentID = "SC-" + date.replaceAll("-", "") + "-" + time.replace(/[^0-9]/g,"");

  const message =
`🦷 Sri Chaitanya Multispeciality Dental Care

Appointment Confirmed

Appointment ID: ${appointmentID}

Patient: ${name}
Phone: ${phone}

Treatment: ${treatment}
Time: ${time}
Date: ${date}

📍 Location:
https://maps.google.com/?q=Sri+Chaitanya+Dental+Care`;

  try {

    // Patient
    await client.sendMessage(`91${phone}@c.us`, message);

    // Clinic
    await client.sendMessage(`918317575165@c.us`, message);

    // Doctor
    await client.sendMessage(`919346319812@c.us`, message);

    res.json({ status: "success" });

  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }

});

app.get("/", (req,res)=>{
  res.send("Dental WhatsApp Server Running");
});

app.listen(3000, () => console.log("Server running 🚀"));

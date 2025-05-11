const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
const allowedOrigins = ['http://localhost:5173', 'landing-page-01-alpha.vercel.app']

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);



app.post("/send-otp", async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${mobile}`, // assuming Indian numbers
    });

    res.status(200).json({ success: true, message: "OTP sent", sid: message.sid });
  } catch (error) {
    console.error("Twilio API error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

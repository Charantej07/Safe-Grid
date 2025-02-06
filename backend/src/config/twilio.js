require("dotenv").config();
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendAlert = async (message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.ALERT_RECIPIENT_PHONE,
    });

    console.log("Alert sent successfully");
  } catch (error) {
    console.error("Failed to send alert:", error.message);
  }
};

const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment"); // adjust if different

router.post("/from-calendly", async (req, res) => {
  try {
    const { calendly } = req.body;
    if (!calendly) return res.status(400).json({ error: "Missing calendly payload" });

    const appt = new Appointment({
      type: calendly.payload?.event?.uri || "calendly_event",
      rawPayload: calendly,
      status: "scheduled",
      createdAt: new Date(),
      contactEmail: calendly.payload?.invitee?.email || (calendly.payload?.invitee?.email_address) || ""
    });

    await appt.save();
    return res.json({ ok: true, id: appt._id });
  } catch (err) {
    console.error("Error saving calendly booking", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

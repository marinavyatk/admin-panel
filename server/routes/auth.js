const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const supabase = require("../supabaseClient");

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

router.post("/sign-up", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password: hashedPassword,
          name,
          last_seen: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === "23505" || error.message.includes("duplicate key")) {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Registration failed" });
    }

    const token = generateToken(data.id);
    res.status(201).json({ token, ...data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, password, active")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.active) {
      return res.status(403).json({ error: "You are blocked" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { data: userUpdated, error: updateError } = await supabase
      .from("users")
      .update({ last_seen: new Date().toISOString() })
      .eq("id", user.id)
      .select("id, email, password, active, last_seen")
      .single();

    if (updateError) {
      console.error("Failed to update last_seen:", updateError.message);
    }

    const token = generateToken(userUpdated.id);
    res.json({ token, ...userUpdated });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

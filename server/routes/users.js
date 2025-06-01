const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const authMiddleware = require("../midllewares/auth-midlleware");

router.get("/", authMiddleware, async (req, res) => {
  const { sorted = "created", ascending, filter } = req.query;

  let query = supabase
    .from("users")
    .select("id, name, email, active, last_seen")
    .order(sorted, { ascending: ascending === "true" });

  if (filter) {
    query = query.ilike("name", `%${filter}%`);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/status", authMiddleware, async (req, res) => {
  const { users, active } = req.body;

  try {
    const updatePromises = users.map((user) => {
      return supabase.from("users").update({ active }).eq("id", user.id);
    });
    const results = await Promise.all(updatePromises);
    const failed = results.find((result) => result.error);

    if (failed) {
      return res.status(500).json({ error: failed.error.message });
    }

    res.status(200).json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

router.delete("/delete", authMiddleware, async (req, res) => {
  const { users } = req.body;
  try {
    const deletePromises = users.map((user) => {
      return supabase.from("users").delete().eq("id", user.id);
    });
    const results = await Promise.all(deletePromises);
    const failed = results.find((result) => result.error);

    if (failed) {
      return res.status(500).json({ error: failed.error.message });
    }
    res.status(200).json({ message: "Successfully deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

module.exports = router;

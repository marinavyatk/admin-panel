const jwt = require("jsonwebtoken");
const supabase = require("../supabaseClient");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { data: user, error } = await supabase
      .from("users")
      .select("id, active")
      .eq("id", decoded.id)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "User not found or deleted" });
    }

    if (!user.active) {
      return res.status(403).json({ error: "You are blocked" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "You are not authorized" });
  }
};

module.exports = authMiddleware;

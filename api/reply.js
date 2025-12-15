export default function handler(req, res) {
  const text = (req.body?.text || "").toLowerCase();

  let reply = "That is good. Please try again.";

  if (text.includes("hello"))
    reply = "Hello! How are you today?";
  else if (text.includes("teach"))
    reply = "Sure. Repeat after me. Good morning.";
  else if (text.includes("good morning"))
    reply = "Excellent. You are learning very well.";

  res.status(200).json({ reply });
}

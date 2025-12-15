export default async function handler(req, res) {
  try {
    const userText = req.body?.text || "";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ reply: "AI key missing." });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "You are an English teacher for beginners. " +
                    "Correct grammar mistakes clearly and politely. " +
                    "If the sentence is wrong, first give the corrected sentence, " +
                    "then explain briefly.\n\nSentence: " +
                    userText
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(200).json({
        reply: "Sorry, I could not understand. Please try again slowly."
      });
    }

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({
      reply: "There was a problem. Please try again."
    });
  }
}

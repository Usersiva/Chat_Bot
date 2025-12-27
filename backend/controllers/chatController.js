export const chatHandler = async (req, res) => {
  const { message } = req.body;

  res.json({
    reply: `🤖 (Mock AI) You said: ${message}`
  });
};

const { tiktokDl } = require("../../../utils/tiktokDl");

module.exports = async (req, res) => {
  try {
    // CORS FIX (ini penting)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    if (req.method !== "GET") {
      return res.status(405).json({
        status: false,
        message: "Method not allowed"
      });
    }

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "url wajib"
      });
    }

    if (!url.includes("tiktok.com")) {
      return res.status(400).json({
        status: false,
        message: "url tidak valid"
      });
    }

    const result = await tiktokDl(url);

    return res.status(200).json({
      status: true,
      creator: "kyzz",
      result
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
};

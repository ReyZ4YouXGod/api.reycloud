// api/download/tiktok.js

const { tiktokDl } = require("../../../utils/tiktokDl");

module.exports = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: false,
        message: "Method not allowed",
      });
    }

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        message: "url wajib diisi",
      });
    }

    if (!url.includes("tiktok.com")) {
      return res.status(400).json({
        status: false,
        message: "url tidak valid",
      });
    }

    const result = await tiktokDl(url);

    res.status(200).json({
      status: true,
      creator: "reycloud",
      result,
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: e.message,
    });
  }
};

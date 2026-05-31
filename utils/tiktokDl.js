const axios = require("axios");

async function tiktokDl(url) {
  try {
    let data = [];

    function formatNumber(integer) {
      return Number(parseInt(integer))
        .toLocaleString()
        .replace(/,/g, ".");
    }

    function formatDate(n, locale = "id-ID") {
      let d = new Date(n * 1000);
      return d.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }

    const res = (
      await axios.post(
        "https://www.tikwm.com/api/",
        {},
        {
          params: {
            url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1,
          },
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10) Chrome/116 Mobile Safari/537.36",
            Referer: "https://www.tikwm.com/",
          },
          timeout: 15000,
        }
      )
    ).data.data;

    if (!res) throw new Error("Data kosong");

    if (res.duration === 0) {
      res.images?.forEach((v) => {
        data.push({ type: "photo", url: v });
      });
    } else {
      data.push(
        { type: "watermark", url: "https://www.tikwm.com" + res.wmplay },
        { type: "nowatermark", url: "https://www.tikwm.com" + res.play },
        { type: "hd", url: "https://www.tikwm.com" + res.hdplay }
      );
    }

    return {
      title: res.title,
      id: res.id,
      region: res.region,
      duration: res.duration,
      taken_at: formatDate(res.create_time),
      cover: "https://www.tikwm.com" + res.cover,
      data,
      music_info: {
        title: res.music_info?.title,
        author: res.music_info?.author,
        url: "https://www.tikwm.com" + res.music,
      },
      stats: {
        views: formatNumber(res.play_count),
        likes: formatNumber(res.digg_count),
        comment: formatNumber(res.comment_count),
        share: formatNumber(res.share_count),
      },
      author: {
        id: res.author?.id,
        username: res.author?.unique_id,
        nickname: res.author?.nickname,
        avatar: "https://www.tikwm.com" + res.author?.avatar,
      },
    };
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { tiktokDl };

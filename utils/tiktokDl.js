const axios = require("axios");

async function tiktokDl(url) {
  try {
    const res = (
      await axios.post(
        "https://www.tikwm.com/api/",
        {},
        {
          params: { url, hd: 1 },
          timeout: 15000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10) Chrome/116 Mobile Safari/537.36",
            Referer: "https://www.tikwm.com/"
          }
        }
      )
    ).data.data;

    if (!res) throw new Error("No data from API");

    let data = [];

    if (res.duration === 0) {
      res.images?.forEach(v => data.push({ type: "photo", url: v }));
    } else {
      data.push(
        { type: "watermark", url: "https://www.tikwm.com" + res.wmplay },
        { type: "nowatermark", url: "https://www.tikwm.com" + res.play },
        { type: "hd", url: "https://www.tikwm.com" + res.hdplay }
      );
    }

    return {
      title: res.title,
      cover: "https://www.tikwm.com" + res.cover,
      duration: res.duration,
      author: {
        username: res.author?.unique_id,
        nickname: res.author?.nickname
      },
      stats: {
        views: res.play_count,
        likes: res.digg_count
      },
      data
    };

  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { tiktokDl };        likes: formatNumber(res.digg_count),
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

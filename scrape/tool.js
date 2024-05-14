const cheerio = require("cheerio");

async function ssweb(url = "", full = false, type = "desktop") {
  type = type.toLowerCase();
  if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
  let form = new URLSearchParams();
  form.append("url", url);
  form.append("device", type);
  if (!!full) form.append("full", "on");
  form.append("cacheLimit", 0);
  let res = await axios({
    url: "https://www.screenshotmachine.com/capture.php",
    method: "post",
    data: form,
  });
  let cookies = res.headers["set-cookie"];
  let buffer = await axios({
    url: "https://www.screenshotmachine.com/" + res.data.link,
    headers: {
      cookie: cookies.join(""),
    },
    responseType: "arraybuffer",
  });
  return Buffer.from(buffer.data);
}

const wattpad = {
  search: async (q) => {
    const baseUrl = "https://www.wattpad.com";
    const url = `${baseUrl}/search/${q}`; // Ganti dengan URL yang sesuai

    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    const results = $(
      "section#section-results-stories article#results-stories ul.list-group li.list-group-item",
    )
      .map((index, element) => ({
        link: baseUrl + $(element).find(".story-card").attr("href"),
        image: $(element).find(".cover img").attr("src"),
        title: $(element)
          .find('.story-info .title[aria-hidden="true"]')
          .first()
          .text()
          .trim(),
        readCount: $(element)
          .find(".new-story-stats .stats-value")
          .eq(0)
          .text(),
        voteCount: $(element)
          .find(".new-story-stats .stats-value")
          .eq(1)
          .text(),
        chapterCount: $(element)
          .find(".new-story-stats .stats-value")
          .eq(2)
          .text(),
        description: $(element).find(".description").text().trim(),
      }))
      .get();

    return results;
  },
  read: async function read(url, page = 1, output = "\n\n", prevTitle = null) {
    const pageURL = `${url}/page/${page}`;
    const response = await fetch(pageURL);
    const text = await response.text();
    const $ = cheerio.load(text);
    const newTitle = $("title").text();

    if (newTitle === prevTitle) {
      const nextURL = $("a.on-navigate.next-up").attr("href");
      if (!nextURL) return output;
      return read(nextURL, 1, output + `\n\n\t${prevTitle}\n`, null);
    }

    console.log(newTitle, text.length);

    $("p").each((index, element) => {
      const paragraph = $(element).text().trim();
      output += `${paragraph}\n`;
    });

    return read(url, page + 1, output, newTitle);
  },

  startRead: async function startRead(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const startReadingLink = $("a.read-btn").attr("href");
      return "https://www.wattpad.com" + startReadingLink;
    } catch (error) {
      throw new Error("Error fetching data:", error);
    }
  },
  list: async function list(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const tableOfContents = $('ul.table-of-contents li[class=""]')
        .map((index, element) => ({
          title: $(element).find(".part-title").text().trim(),
          link:
            "https://www.wattpad.com" +
            $(element).find("a.on-navigate").attr("href"),
        }))
        .get();
      return tableOfContents;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  },
};
const xnxx = {
  search: async (t) => {
    return new Promise((n, e) => {
      const r = "https://www.xnxx.com";
      fetch(`${r}/search/${t}/${Math.floor(3 * Math.random()) + 1}`, {
        method: "get",
      })
        .then((t) => t.text())
        .then((t) => {
          let e = cheerio.load(t, {
              xmlMode: !1,
            }),
            o = [],
            a = [],
            i = [],
            s = [];
          e("div.mozaique").each(function (t, n) {
            e(n)
              .find("div.thumb")
              .each(function (t, n) {
                a.push(
                  r + e(n).find("a").attr("href").replace("/THUMBNUM/", "/"),
                );
              });
          }),
            e("div.mozaique").each(function (t, n) {
              e(n)
                .find("div.thumb-under")
                .each(function (t, n) {
                  i.push(e(n).find("p.metadata").text()),
                    e(n)
                      .find("a")
                      .each(function (t, n) {
                        o.push(e(n).attr("title"));
                      });
                });
            });
          for (let t = 0; t < o.length; t++)
            s.push({
              title: o[t],
              info: i[t],
              link: a[t],
            });
          n({
            status: !0,
            result: s,
          });
        })
        .catch((t) =>
          e({
            status: !1,
            result: t,
          }),
        );
    });
  },
  download: async (t) => {
    return new Promise((n, e) => {
      fetch(`${t}`, {
        method: "get",
      })
        .then((t) => t.text())
        .then((e) => {
          let r = cheerio.load(e, {
            xmlMode: !1,
          });
          const o = r('meta[property="og:title"]').attr("content"),
            a = r('meta[property="og:duration"]').attr("content"),
            i = r('meta[property="og:image"]').attr("content"),
            s = r('meta[property="og:video:type"]').attr("content"),
            c = r('meta[property="og:video:width"]').attr("content"),
            u = r('meta[property="og:video:height"]').attr("content"),
            f = r("span.metadata").text().trim(),
            l = r("#video-player-bg > script:nth-child(6)").html(),
            m = {
              low: (l.match("html5player.setVideoUrlLow\\('(.*?)'\\);") ||
                [])[1],
              high: l.match("html5player.setVideoUrlHigh\\('(.*?)'\\);")[1],
              HLS: l.match("html5player.setVideoHLS\\('(.*?)'\\);")[1],
              thumb: l.match("html5player.setThumbUrl\\('(.*?)'\\);")[1],
              thumb69: l.match("html5player.setThumbUrl169\\('(.*?)'\\);")[1],
              thumbSlide: l.match("html5player.setThumbSlide\\('(.*?)'\\);")[1],
              thumbSlideBig: l.match(
                "html5player.setThumbSlideBig\\('(.*?)'\\);",
              )[1],
            };
          n({
            status: !0,
            title: o,
            URL: t,
            duration: a,
            image: i,
            videoType: s,
            videoWidth: c,
            videoHeight: u,
            info: f,
            files: m,
          });
        })
        .catch((t) =>
          e({
            status: !1,
            result: t,
          }),
        );
    });
  },
};
process.env["SPOTIFY_CLIENT_ID"] = "4c4fc8c3496243cbba99b39826e2841f";
process.env["SPOTIFY_CLIENT_SECRET"] = "d598f89aba0946e2b85fb8aefa9ae4c8";

async function convert(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

async function spotifyCreds() {
  return new Promise(async (resolve) => {
    try {
      const json = await (
        await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  process.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    process.env.SPOTIFY_CLIENT_SECRET,
                ).toString("base64"),
            },
          },
        )
      ).data;
      if (!json.access_token)
        return resolve({
          creator: "Budy x creator ",
          status: false,
          msg: "Can't generate token!",
        });
      resolve({
        status: true,
        data: json,
      });
    } catch (e) {
      resolve({
        status: false,
        msg: e.message,
      });
    }
  });
}

const SpotifyApi = {
  detail: async (url) => {
    return new Promise(async (resolve) => {
      try {
        const creds = await spotifyCreds();
        if (!creds.status) return resolve(creds);
        const json = await (
          await axios.get(
            "https://api.spotify.com/v1/tracks/" + url.split("track/")[1],
            {
              headers: {
                Authorization: "Bearer " + creds.data.access_token,
              },
            },
          )
        ).data;
        resolve({
          thumbnail: json.album.images[0].url,
          title: json.artists[0].name + " - " + json.name,
          artist: json.artists[0],
          duration: convert(json.duration_ms),
          preview: json.preview_url,
        });
      } catch (e) {
        resolve({
          msg: e.message,
        });
      }
    });
  },
  search: async (query, type = "track", limit = 20) => {
    return new Promise(async (resolve) => {
      try {
        const creds = await spotifyCreds();
        if (!creds.status) return resolve(creds);
        const json = await (
          await axios.get(
            "https://api.spotify.com/v1/search?query=" +
              query +
              "&type=" +
              type +
              "&offset=0&limit=" +
              limit,
            {
              headers: {
                Authorization: "Bearer " + creds.data.access_token,
              },
            },
          )
        ).data;
        if (!json.tracks.items || json.tracks.items.length < 1)
          return resolve({
            creator: "Budy x creator ",
            status: false,
            msg: "Music not found!",
          });
        let data = [];
        json.tracks.items.map((v) =>
          data.push({
            title: v.album.artists[0].name + " - " + v.name,
            duration: convert(v.duration_ms),
            popularity: v.popularity + "%",
            preview: v.preview_url,
            url: v.external_urls.spotify,
          }),
        );
        resolve({
          data,
        });
      } catch (e) {
        resolve({
          msg: e.message,
        });
      }
    });
  },
  download: async (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        const yanzz = await axios.get(
          `https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
              "sec-ch-ua": '"Not)A;Brand";v="24", "Chromium";v="116"',
              "sec-ch-ua-mobile": "?1",
              "sec-ch-ua-platform": '"Android"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "cross-site",
              Referer: "https://spotifydownload.org/",
              "Referrer-Policy": "strict-origin-when-cross-origin",
            },
          },
        );
        const yanz = await axios.get(
          `https://api.fabdl.com/spotify/mp3-convert-task/${yanzz.data.result.gid}/${yanzz.data.result.id}`,
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
              "sec-ch-ua": '"Not)A;Brand";v="24", "Chromium";v="116"',
              "sec-ch-ua-mobile": "?1",
              "sec-ch-ua-platform": '"Android"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "cross-site",
              Referer: "https://spotifydownload.org/",
              "Referrer-Policy": "strict-origin-when-cross-origin",
            },
          },
        );
        const result = {};
        result.title = yanzz.data.result.name;
        result.type = yanzz.data.result.type;
        result.artis = yanzz.data.result.artists;
        result.durasi = yanzz.data.result.duration_ms;
        result.image = yanzz.data.result.image;
        result.download =
          "https://api.fabdl.com" + yanz.data.result.download_url;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },
};
async function igstalk(username) {
  let html = await (await fetch("https://dumpoir.com/v/" + username)).text();
  const $ = cheerio.load(html);
  const Profile = {
    image: $("#user-page > div.user > div.row > div > div.user__img")
      .attr("style")
      .replace(/(background-image: url\(\'|\'\);)/gi, ""),
    username: $(".user__title h4").text().trim(),
    fullName: $(".user__title h1").text().trim(),
    bio: $(".user__info-desc").text().trim(),
    posts: $(".list__item").eq(0).text().trim(),
    followers: $(".list__item").eq(1).text().trim(),
    following: $(".list__item").eq(2).text().trim(),
  };
  const Post = [];
  $(".content__item").each((index, element) => {
    const post = {};
    const img = $(element).find(".content__img").attr("src");
    const desc = $(element).find(".content__text p").text();
    const likes = parseInt($(element).find(".bx-like + span").text());
    const comments = parseInt(
      $(element).find(".bx-comment-dots + span").text(),
    );
    const time = $(element).find(".bx-time + span").text();

    if (!isNaN(likes) && !isNaN(comments) && img && desc && time) {
      post.image = img;
      post.description = desc;
      post.likes = likes;
      post.comments = comments;
      post.time = time;
      Post.push(post);
    }
  });

  const result = {
    Profile: Profile,
    Post: Post,
  };
  return result;
}
async function tts(text, lang = 'ja') {
let fs = require('fs')
let path = require('path')

  console.log(lang, text)
  return new Promise((resolve, reject) => {
    try {
      let tts = require("node-gtts")(lang)
      let filePath = path.join(__dirname, '../tmp', (1 * new Date) + '.wav')
      tts.save(filePath, text, () => {
        resolve(fs.readFileSync(filePath))
        fs.unlinkSync(filePath)
      })
    } catch (e) { reject(e) }
  })
}
module.exports = {
  ssweb,
  wattpad,
  xnxx,
  SpotifyApi,
  igstalk,
tts,
};
let fs = require("fs");
let chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update scrape"));
  delete require.cache[file];
  require(file);
});
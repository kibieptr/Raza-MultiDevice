const modul = {
axios: require('axios'),
cheerio: require('cheerio'),
fs: require('fs'),
fetch: require('node-fetch'),
got: require('got'),
util: require('util'),
yts: require('yt-search'),
ytdl: require('ytdl-core')
}
const { axios, cheerio, fs, fetch, got, util, yts, ytdl } = modul;


function kusoNime(query) {
    return new Promise(async (resolve, reject) => {
      const optionsGet = {
        method: 'GET',
        headers: {
           'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
        }
    }
    const getHtml = await fetch('https://kusonime.com/?s=' + query + '&post_type=anime', optionsGet).then(rsp => rsp.text())
    const $ = cheerio.load(getHtml)
    const url = []
    $('div > div > ul > div > div > div').each(function() {
      url.push($(this).find('a').attr('href'))
    })
    const randomUrl = url[Math.floor(Math.random() * url.length)]
    const getHtml2 = await fetch(randomUrl, optionsGet).then(rsp => rsp.text())
    const $$ = cheerio.load(getHtml2)
    resolve({
      status: 200,
      result: {
        title: $$('.vezone > .venser').find('.jdlz').text(),
        thumb: $$('.vezone > .venser').find('div > img').attr('src'),
        views: $$('.vezone > .venser').find('div > div > span').text().trim().replace(' Views', ''),
        genre: $$('.vezone > .venser').find('.lexot > .info > p').eq(1).text().replace('Genre : ', ''),
        seasons: $$('.vezone > .venser').find('.lexot > .info > p').eq(2).text().replace('Seasons : ', ''),
        producers: $$('.vezone > .venser').find('.lexot > .info > p').eq(3).text().replace('Producers: ', ''),
        type: $$('.vezone > .venser').find('.lexot > .info > p').eq(4).text().replace('Type: ', ''),
        status: $$('.vezone > .venser').find('.lexot > .info > p').eq(5).text().replace('Status: ', ''),
        rating: $$('.vezone > .venser').find('.lexot > .info > p').eq(7).text().replace('Score: ', ''),
        duration: $$('.vezone > .venser').find('.lexot > .info > p').eq(8).text().replace('Duration: ', ''),
        release: $$('.vezone > .venser').find('.lexot > .info > p').eq(9).text().replace('Released on: ', ''),
        desc: $$('.vezone > .venser').find('p').eq(10).text(),
        url: randomUrl
      }
    })
  })
}

async function npmstalk(packageName) {
  let stalk = await axios.get("https://registry.npmjs.org/"+packageName)
  let versions = stalk.data.versions
  let allver = Object.keys(versions)
  let verLatest = allver[allver.length-1]
  let verPublish = allver[0]
  let packageLatest = versions[verLatest]
  return {
    name: packageName,
    versionLatest: verLatest,
    versionPublish: verPublish,
    versionUpdate: allver.length,
    latestDependencies: Object.keys(packageLatest.dependencies).length,
    publishDependencies: Object.keys(versions[verPublish].dependencies).length,
    publishTime: stalk.data.time.created,
    latestPublishTime: stalk.data.time[verLatest]
  }
}

function quotesanime() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 184)
        axios.get('https://otakotaku.com/quote/feed/'+page)
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const hasil = []
            $('div.kotodama-list').each(function(l, h) {
                hasil.push({
                    link: $(h).find('a').attr('href'),
                    gambar: $(h).find('img').attr('data-src'),
                    karakter: $(h).find('div.char-name').text().trim(),
                    anime: $(h).find('div.anime-title').text().trim(),
                    episode: $(h).find('div.meta').text(),
                    up_at: $(h).find('small.meta').text(),
                    quotes: $(h).find('div.quote').text().trim()
                })
            })
            resolve(hasil)
        }).catch(reject)
    })
}

function hentaivid() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/'+page)
        .then((data) => {
            const $ = cheerio.load(data.data)
            const hasil = []
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                })
            })
            resolve(hasil)
        })
    })
}

function nomorhp(nomor) {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        type: 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      url: 'https://www.primbon.com/no_hoki_bagua_shuzi.php',
      data: new URLSearchParams(Object.entries({
        nomer: nomor,
        submit: 'Submit!'
      }))
    }).then(({data}) => {
      let $ = cheerio.load(data)
      let fetchText = $('#body').text().trim()
      let result;
      try {
          result = {
            nomor_hp: fetchText.split('No. HP : ')[1].split('\n')[0],
            angka_bagua_shuzi: fetchText.split('Angka Bagua Shuzi : ')[1].split('\n')[0],
            energi_positif: {
              kekayaan: fetchText.split('Kekayaan = ')[1].split('\n')[0],
              kesehatan: fetchText.split('Kesehatan = ')[1].split('\n')[0],
              cinta: fetchText.split('Cinta/Relasi = ')[1].split('\n')[0],
              kestabilan: fetchText.split('Kestabilan = ')[1].split('\n')[0],
              persentase: fetchText.split('Kestabilan = ')[1].split('% = ')[1].split('ENERGI NEGATIF')[0]
            },
            energi_negatif: {
              perselisihan: fetchText.split('Perselisihan = ')[1].split('\n')[0],
              kehilangan: fetchText.split('Kehilangan = ')[1].split('\n')[0],
              malapetaka: fetchText.split('Malapetaka = ')[1].split('\n')[0],
              kehancuran: fetchText.split('Kehancuran = ')[1].split('\n')[0],
              persentase: fetchText.split('Kehancuran = ')[1].split('% = ')[1].split("\n")[0]
            },
            notes: fetchText.split('* ')[1].split('Masukan Nomor HP Anda')[0]
          }
      } catch {
        result = `Nomor "${nomor}" tidak valid`
      }
      resolve(result)
    }).catch(reject)
  })
}

function searchsticker(queryy) {
  return new Promise((resolve, reject) => {
    axios.get(`https://getstickerpack.com/stickers?query=${queryy}`)
    .then(({data}) => {
      const $ = cheerio.load(data)
      const source = []
      const linknya = []
      $('#stickerPacks > div > div:nth-child(3) > div > a').each((a, b) => {
        source.push($(b).attr('href'))
      })
      axios.get(source[Math.floor(Math.random() * source.length)])
      .then(({data}) => {
        const $2 = cheerio.load(data)
        $2('#stickerPack > div > div.row > div > img').each((c, d) => {
          linknya.push($2(d).attr('src').replace(/&d=200x200/g, ''))
        })
        result = {
            title: $2('#intro > div > div > h1').text(),
            stickerUrl: linknya
        }
        resolve(result)
      })
    }).catch(reject)
  })
}


function listsurah() {
            return new Promise((resolve, reject) => {
                  axios.get('https://litequran.net/')
                  .then(({ data }) => {
                       const $ = cheerio.load(data)
                       let listsurah = []
                       $('body > main > section > ol > li > a').each(function(a, b) {
                    listsurah.push($(b).text())
                })
                       result = {
                        status: 200,
                        author: 'bang syaii',
                        listsurah: listsurah
                       }
                       resolve(result)
                  }).catch(reject)
             })
        }
        
function jadwalsholat(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://umrotix.com/jadwal-sholat/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                $('body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) ').each(function(a, b) {   
                    result = {
                    status: 200,
                    author: 'bang syaii',
                    tanggal: $(b).find('> div:nth-child(2)').text(),
                    imsyak: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)').text(),
                    subuh: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)').text(),
                    dzuhur: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)').text(),
                    ashar: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)').text(),
                    maghrib: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)').text(),
                    isya: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)').text()
                }
                resolve(result)
                })
            })
            .catch(reject)
    })
}

async function telesticker(url){
    return new Promise(async (resolve, reject) => {
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const hasil = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result.url)
        }
    resolve(hasil)
    })
}

function linkwa(nama){
	return new Promise((resolve,reject) => {
		axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search='+ nama +'&searchby=name')
		.then(({ data }) => {
			const $ = cheerio.load(data);
			const result = [];
			const lnk = [];
			const nm = [];
		$('div.wa-chat-title-container').each(function(a,b){
			const limk = $(b).find('a').attr('href');
			lnk.push(limk)
			})
		$('div.wa-chat-title-text').each(function(c,d) {
			const name = $(d).text();
			nm.push(name)
			})
		for( let i = 0; i < lnk.length; i++){
			result.push({
				nama: nm[i].split('. ')[1],
				link: lnk[i].split('?')[0]
			})
		}
		resolve(result)
		})
	.catch(reject)
	})
}

async function mediafiredl(url) {
    var _a, _b;
    if (!/https?:\/\/(www\.)?mediafire\.com/.test(url))
        throw new Error('Invalid URL: ' + url);
    const data = await got(url).text();
    const $ = cheerio.load(data);
    const Url = ($('#downloadButton').attr('href') || '').trim();
    const url2 = ($('#download_link > a.retry').attr('href') || '').trim();
    const $intro = $('div.dl-info > div.intro');
    const filename = $intro.find('div.filename').text().trim();
    const filetype = $intro.find('div.filetype > span').eq(0).text().trim();
    const ext = ((_b = (_a = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim()) || 'bin';
    const $li = $('div.dl-info > ul.details > li');
    const aploud = $li.eq(1).find('span').text().trim();
    const filesizeH = $li.eq(0).find('span').text().trim();
    const filesize = parseFloat(filesizeH) * (/GB/i.test(filesizeH)
        ? 1000000
        : /MB/i.test(filesizeH)
            ? 1000
            : /KB/i.test(filesizeH)
                ? 1
                : /B/i.test(filesizeH)
                    ? 0.1
                    : 0);
    return {
        url: Url,
        url2,
        filename,
        filetype,
        ext,
        aploud,
        filesizeH,
        filesize
    };
}

async function ytPlayMp4(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = ytdl.getVideoID(url[0])
                const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                        let vid = pormat[i]
                        video.push(vid.url)
                    }
                   }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: video[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytPlayMp3(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = ytdl.getVideoID(url[0])
                const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    status: true,
                    code: 200,
                    creator: 'Bang syaii',
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

function getLatestAnime() {
	return new Promise((resolve, reject) => {
		axios.get('https://www.mynimeku.com/').then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox-item > a').each(function(i, e) {
				let title = $(e).attr('title')
				let link = $(e).attr('href')
				let status = $(e).find('div.flexbox-status').text()
				let thumb = $(e).find('div.flexbox-thumb > img').attr('data-src')
				let episode = $(e).find('div.flexbox-episode > span.eps').text().split(' ')[1]
				let type = $(e).find('div.flexbox-type').text()
				result.push({ title, status, episode, type, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function getLatestKomik() {
	return new Promise((resolve, reject) => {
		axios.get('https://www.mynimeku.com/').then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox4-item').each(function(i, e) {
				let title = $(e).find('a').attr('title')
				let link = $(e).find('a').attr('href')
				let thumb = $(e).find('div.flexbox4-thumb > img').attr('data-src')
				let type = $(e).find('div.flexbox4-type').text()
				let status = $(e).find('div.flexbox-status').text()
				let chapter = $(e).find('ul.chapter > li').text().split(' ')[1]
				result.push({ title, status, chapter, type, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function AnimeDl(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text()
			let thumb = $('meta[property="og:image"]').attr('content')
			let url = $('#linklist').find('a').attr('href')
			resolve({ title, thumb, url })
		}).catch(reject)
	})
}

function KomikDl(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text().replace('Bahasa Indonesia - MyNimeku', '').trim()
			let result = []
			$('div.reader-area > p > img').each(function () {
				result.push($(this).attr('src'))
			})
			resolve({ title, result })
		}).catch(reject)
	})
}

function otakudesu(judul){
	return new Promise(async(resolve, reject) => {
	axios.get('https://otakudesu.moe/?s=' + judul + '&post_type=anime')
	.then(({ data }) => {
	const $ = cheerio.load(data)
	const result = {};
	let limk = $('#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a').attr('href')
	axios.get(limk).then(({ data }) => {
	const $$ = cheerio.load(data)
	result.message = 'KirBotz'
	result.img = $$('#venkonten > div.venser > div.fotoanime').find('img').attr('src')
	$$('#venkonten > div.venser > div.fotoanime > div.infozin > div').each(function(a, b) {
		result.judul = $$(b).find('p:nth-child(1)').text().replace('Judul: ','')
		result.jepang = $$(b).find('p:nth-child(2)').text().replace('Japanese: ','')
		result.rate = $$(b).find('p:nth-child(3)').text().replace('Skor: ','')
		result.produser = $$(b).find('p:nth-child(4)').text().replace('Produser: ','')
		result.tipe = $$(b).find('p:nth-child(5)').text().replace('Tipe: ','')
		result.status = $$(b).find('p:nth-child(6)').text().replace('Status: ','')
		result.episode = $$(b).find('p:nth-child(7)').text().replace('Total Episode: ','')
		result.durasi = $$(b).find('p:nth-child(8)').text().replace('Durasi: ','')
		result.rilis = $$(b).find('p:nth-child(9)').text().replace('Tanggal Rilis: ','')
		result.studio = $$(b).find('p:nth-child(10)').text().replace('Studio: ','')
		result.genre = $$(b).find('p:nth-child(11)').text().replace('Genre: ','')
		result.desc = $$('#venkonten > div.venser > div.fotoanime > div.sinopc').text().replace('.','\n') + $$(b).find('div.sinopc > p:nth-child(2)').text()
		result.batch = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
	})
	const lim = $$('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href')
	axios.get(lim).then(({ data }) => {
	const $$$ = cheerio.load(data)
		result.batchSD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(1) > a:nth-child(3)').attr('href')
		result.batchHD = $$$('#venkonten > div:nth-child(6) > ul > li:nth-child(3) > a:nth-child(3)').attr('href')
		resolve(result)
				})
			})
		})
	.catch(reject)
	})
}

function Hero(querry) {
    return new Promise(async (resolve, reject) => {
        try {
            let upper = querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase()
            const {
                data,
                status
            } = await axios.get('https://mobile-legends.fandom.com/wiki/' + upper);
            if (status === 200) {
                const $ = cheerio.load(data);
                let atributes = []
                let rill = []
                let rull = []
                let rell = []
                let hero_img = $('figure.pi-item.pi-image > a > img').attr('src')
                let desc = $('div.mw-parser-output > p:nth-child(6)').text()
                $('.mw-parser-output > table:nth-child(9) > tbody > tr').each((u, i) => {
                    let _doto = []
                    $(i).find('td').each((o, p) => {
                        _doto.push($(p).text().trim())
                    })
                    if (_doto.length === 0) return
                    atributes.push({
                        attribute: _doto[0],
                        level_1: _doto[1],
                        level_15: _doto[2],
                        growth: _doto.pop()
                    })
                })
                $('div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font').each((i, u) => {
                    rill.push($(u).text().trim())
                })
                $('aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default').each((i, u) => {
                    rull.push($(u).html())
                })
                const _$ = cheerio.load(rull[1])
                _$('.pi-item.pi-data.pi-item-spacing.pi-border-color').each((l, m) => {
                    rell.push(_$(m).text().trim().replace(/\n/g, ':').replace(/\t/g, ''))
                })
                const result = rell.reduce((acc, curr) => {
                    const [key, value] = curr.split('::');
                    acc[key] = value;
                    return acc;
                }, {});
                let anu = {
                    hero_img: hero_img,
                    desc: desc,
                    release: rill[0],
                    role: rill[1],
                    specialty: rill[2],
                    lane: rill[3],
                    price: rill[4],
                    gameplay_info: {
                        durability: rill[5],
                        offense: rill[6],
                        control_effect: rill[7],
                        difficulty: rill[8],
                    },
                    story_info_list: result,
                    story_info_array: rell,
                    attributes: atributes
                }
                resolve(anu)
            } else if (status === 400) {
                resolve({
                    mess: 'hh'
                })
            }
            console.log(status)
        } catch (err) {
            resolve({
                mess: 'asu'
            })
        }
    })
}

async function fetchData(endpoint, params) {
    try {
      const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
class LitensiApi {
  getProfileData = async () => {
    const endpoint = 'profile';
    const params = {
      api_id: litensiID,
      api_key: litensiKey
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

  getServicesData = async(category, filter) => {
    const endpoint = 'services';
    const params = {
      api_id: litensiID,
      api_key: litensiKey,
      category: category,
      filter: filter
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

   placeOrder = async(serviceId, target, quantity, customComments, customLink) => {
    const endpoint = 'order';
    const params = {
      api_id: litensiID,
      api_key: litensiKey,
      service: serviceId,
      target: target,
      quantity: quantity,
      custom_comments: customComments || '',
      custom_link: customLink || ''
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

  getOrderStatus = async(orderId) => {
    const endpoint = 'status';
    const params = {
      api_id: litensiID,
      api_key: litensiKey,
      id: orderId
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

   getSMSCountries = async()  => {
    const endpoint = 'sms/countries';
    const params = {
      api_id: litensiID,
      api_key: litensiKey
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

   getSMSServices = async () => {
    const endpoint = 'sms/services';
    const params = {
      api_id: litensiID,
      api_key: litensiKey
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

   getSMSOperators = async () => {
    const endpoint = 'sms/operators';
    const params = {
      api_id: litensiID,
      api_key: litensiKey
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

  getSMSPrices = async (countryId, serviceId, priceFilter) => {
    const endpoint = 'sms/prices';
    const params = {
      api_id: litensiID,
      api_key: litensiKey,
      country: countryId,
      service: serviceId,
      price_filter: priceFilter
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

   placeSMSOrder = async (countryId, serviceId, operator, maxPrice) => {
    const endpoint = 'sms/order';
    const params = {
      api_id: litensiID,
      api_key: litensiKey,
      country: countryId,
      service: serviceId,
      operator: operator,
      max_price: maxPrice || ''
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

   getSMSStatus = async (orderId) => {
    const endpoint = 'sms/getstatus';
    const params = {
      api_id: litensiID,
      api_key: litensiKey,
      order_id: orderId
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }

   setSMSStatus = async (orderId, status) => {
    const endpoint = 'sms/setstatus';
    const params = {
      api_id: litensiID,
      api_key: litensiKey,
      order_id: orderId,
      status: status
    };
    const response = await(await axios.post("https://litensi.id/api/" + endpoint, params)).data;
      return response; // Gunakan data sesuai kebutuhan
  }
}

async function searchPinterest(querry) {
    let HASIL = []
    await axios.request(`https://id.pinterest.com/search/pins/?rs=typed&q=` + querry, {
        method: "GET",
        url: "https://id.pinterest.com/search/pins/?rs=typed&q=" + querry,
        headers: {
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "upgrade-insecure-requests": "1",
            "cookie": "csrftoken=ebe0be3a93cea6072be18633add953a2; _b=\"AVezvd6F4UtE24FUsA6INxipyZZDoSpyCc5vaJK4QDYXmExosVEc4h6WkiKhlVtQ430=\"; cm_sub=denied; fba=True; _ga=GA1.2.862909259.1620474446; g_state={\"i_l\":0}; _auth=1; _pinterest_sess=TWc9PSZ0VEZqZmdDSlJYaGU5REIvNklIcVlnMjE5b0ZraTE5REJVQ0JiMUwxTkZZaGFoVk1sRDVhOFlwQzhkQnQ0YkMwRlNyV0lIWUFlK0ZVTkVxYUhKNmlvZ0R1UXlQYTBRRVVhMU1yYkpmcXpHK3UyNjNhckRqUFFOYVJVa3RnVmJtVzd2MmRGaHFMZUpLNVhtaHptTDhWSnBSdXhZY0FhRnRTN3J1S0V4cGtsVTBxeE54NkF2blVNSFV3R0NTQTR1bVVNRURGVGdnYlN5UjdBbk9YcHVGbGI3a1kwd1dEZDgrZVM1SDc3V0pJMm00OWxKUDVNQjBLVlFocTB4Mjg1M1RnbGxBaFAxbS9MTnVzei91cEQvcjBtakp6N0ZnU2t1Y3NxWW1DRDV1Q3h0ankvQ3FEWGh3MXczcXBHNXJpYVNCMHB6dUoxMGF6ZzVxN2VqQVBoSElSd0tiQk41ZVRPQXlOaGNpNzVQMWJSeVZJbCtYYVMxQ1ZRUFUwalU3eGVzMGRySlNzdWo1NG5uaXNFM3ZpT0o0TkZHR1daUXlwaXFQclMwa04raW9xVnVaTTRSVGEzTE03TVlZcmZYVDd5UmVPd2lZaGw4aE9VMHJBd0tidEsrcHdPWk96RlFMekVLTzY3VU1PL0tIYUdwUE1IWVdJNnJXalBkU09Sb3dEaHlQVVR1T1RqNW5Sc2FRdmVkZmhkMk9HNHBCL0ZpZ3NMdmZvVW9ReVltTFBCTlNLWHpray9LNWJ2UTNvTlBzVm9aZjRvYWRvRFhla0dBNzdveWJVYXZmVFp2cnFFNU5DYUVwSHhxeDlIajNIVTlHaEVYdGptWm5mSGVSRmtIMmQwVVVVZlVCVEh6UHB3TnBtdWV0b2l6L3VTc3pXMXFGN3lHS3ZJM3BwL0NrWVJDMm1HY2tROGxuQVFRNS9OUW45R3dtSk8zeFJidVFSTG1qTG5PelAvKzd3T3lrN1NoKzBHVGNTY1pGSEY0bW8xcGVmc3NtclBhTWE2QUMxOXNpQWUwRmo4UHl0ZGpwUzhUQXVhbjYwT0ZJeHhHai8yOWFUVTA1Wkx2czN4VSttLzMvbkFVQ2svWnZvNC9xZ3E4VkhYSFZ5elo4TzhtU0o5c3ZDcEJyYjE3QVI1WHlmTTFhWThvWHQ1T0tSTWRsWnI3a1lpU245dEVLd1lZSXRremtkTUZmcVA2YUg0c1UrSk1JOWJVRzZpcWd3T0NVaFZkdUh3UUdURi9sbDBqT2pBZVV2ZnlTQzc5ZnBMYkFMQ1ZsWjdIYWcmaDc1Uk5kK2I4MjFMUXBaVUthci9rVHpCUWRvPQ==; _pinterest_cm=\"TWc9PSYxZnpkMS9XN29Rd2R0TnpBN0RzVktja1J4NUtINUJqRzNGODFXS0xES1pndWlNVm52a0d3V0JocmVIS3p5eDdnNXNZa0hGelNQNDBSTFRId3ZhTFFIQjRGOW1lNlJZMzFiVlg1MHhSOFpmMGhRZUoySUpJZDIyWlVYMjRXNHRaL1lodFl4eW1jWjNyTklpbytYbHZyd29nRm5DY0pQOGgyUWpDdk9zQ1craXR5VEZoNHV4ZzRnOXV4SUFFSStYZCsmT08zMFI1bktXa3pwSDFtK3NNRWpxWWNpQzNzPQ==\"; _routing_id=\"595f24cd-7f4c-4495-aa67-37212d099cd8\"; sessionFunnelEventLogged=1"
        }
    }).then(res => {
        const $ = cheerio.load(res.data)
        let hasil = []
        $('body > div > div > div > div > div > div > div > div > div > div > div').each(function(a, b) {
            $(b).find('div').each(function(c, d) {
                let Link = $(d).find('div > div > div > div > a').find('img').attr('src')
                hasil.push(Link)
            })
        })

        const output = hasil
            .filter((v) => v !== undefined)
            .map((v) => v.replace("236x", "originals"))
            .filter((url) => url.includes("/originals/"));
        const result = {
            status: res.status,
            creator: "Lexic team",
           result: [...new Set(output)]
        }
        HASIL.push(result)
    })
    return HASIL[0]
}


module.exports = {
kusoNime,
npmstalk, 
quotesanime, 
hentaivid, 
nomorhp,
searchsticker, 
jadwalsholat,
telesticker, 
mediafiredl, 
ytPlayMp4, 
ytPlayMp3,
getLatestAnime, 
getLatestKomik, 
otakudesu, 
Hero,
LitensiApi,
searchPinterest
}


let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update scrape"))
  delete require.cache[file]
  require(file)
})
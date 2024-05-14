const axios = require("axios")
const chalk = require("chalk")

async function youAI(
  prompt,
  {
    page = 1,
    count = 10,
    safeSearch = "Moderate",
    onShoppingpage = false,
    mkt = "",
    responseFilter = "WebPages,Translations,TimeZone,Computation,RelatedSearches",
    domain = "youchat",
    queryTraceId = null,
    chat = [],
    includelinks = false,
    detailed = false,
    debug = false
  } = {}
) {
  let proxyurl = "https://files.xianqiao.wang/"
  const headers = {
    "authority": "you.com",
    "accept": "text/event-stream",
    "accept-language": "en,fr-FRq=0.9,frq=0.8,es-ESq=0.7,esq=0.6,en-USq=0.5,amq=0.4,deq=0.3",
    "cache-control": "no-cache",
    "referer": `https://you.com/search?q=${prompt}&tbm=youchat`,
    "sec-ch-ua": '"Not_A Brand"v="99", "Google Chrome"v="109", "Chromium"v="109"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": `safesearch_guest=Moderate uuid_guest=${randomUUID()}`,
    "user-agent": "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
  }

  const params = new URLSearchParams({
    q: prompt,
    page: page,
    count: count,
    safeSearch: safeSearch,
    onShoppingPage: onShoppingpage,
    mkt: mkt,
    responseFilter: responseFilter,
    domain: domain,
    queryTraceId: queryTraceId === null ? randomUUID() : queryTraceId,
    chat: JSON.stringify(chat),
  })

  const response = await axios.get(proxyurl + "https://you.com/api/streamingSearch?" + params.toString(), {
    headers: headers
  })

  if (debug) {
    console.clear()
    console.log(chalk.green("[DEBUGGER]:"))
  }

  const responseText = response.data
  const youChatSerpResults = responseText.match(/youChatSerpResults\ndata: (.*)\n\nevent/)[1]
  const thirdPartySearchResults = responseText.match(/thirdPartySearchResults\ndata: (.*)\n\nevent/)[1]
  const text = responseText.split('}]}\n\nevent: youChatToken\ndata: {"youChatToken": "')[1].replace(/"}\n\nevent: youChatToken\ndata: {"youChatToken": "|event: done\ndata: I'm Mr. Meeseeks. Look at me.\n\n/g, '')

  const extra = {
    youChatSerpResults: JSON.parse(youChatSerpResults),
  }

  return {
    response: text,
    links: includelinks ? JSON.parse(thirdPartySearchResults).search.third_party_search_results : null,
    extra: detailed ? extra : null,
  }
}

module.exports = youAI

function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * DannTeam
 * ig: @dannalwaysalone
 * Note: Jika error maka hubungi @dannalwaysalone di instagram
*/
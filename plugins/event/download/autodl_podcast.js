exports.run = {
   regex: /^(?:https?:\/\/)?(?:podcasts\.)?(?:google\.com\/)(?:feed\/)(?:\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:podcasts\.)?(?:google\.com\/)(?:feed\/)(?:\S+)?$/
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('pin', m.sender)
               links.map(async link => {
                  let json = await Api.podcast(link)
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  let teks = `◦  *Title* : ${json.data.title}\n`
                  teks += `◦  *Author* : ${json.data.author}\n`
                  teks += `◦  *Duration* : ${json.data.duration}`
                  client.sendFile(m.chat, 'https://telegra.ph/file/92be727e349c3cf78c98a.jpg', '', teks, m).then(() => {
                     client.sendFile(m.chat, json.data.audio, json.data.title + '.mp3', '', m, {
                        document: true
                     })
                  })
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}
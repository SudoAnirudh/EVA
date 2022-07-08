const { decode } = require('html-entities')
const { yta } = require('../../lib/y2mate')
const yt = require('youtube-sr').default
exports.run = {
   usage: ['play'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'fadded'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const search = await yt.search(text, {
            limit: 1,
            safeSearch: true
         })
         if (!search || search.length == 0) return client.reply(m.chat, global.status.fail, m)
         const {
            dl_link,
            thumb,
            title,
            filesizeF
         } = await yta('https://youtu.be/' + search[0].id)
         if (!dl_link) return client.reply(m.chat, global.status.fail, m)
         let caption = `◦  *Title* : ${decode(title)}\n`
         caption += `◦  *Size* : ${filesizeF}\n`
         caption += `◦  *Duration* : ${search[0].durationFormatted}\n`
         caption += `◦  *Bitrate* : 128kbps`
         let chSize = Func.sizeLimit(filesizeF, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `💀 File size (${filesizeF}) exceeds the maximum limit, download it by yourself via this link : ${await (await scrap.shorten(dl_link)).data.url}`, m)
         client.sendFile(m.chat, thumb, '', caption, m).then(() => {
            client.sendFile(m.chat, dl_link, decode(title) + '.mp3', '', m, {
               document: true
            })
         })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   owner: true,
   limit: true,
   cache: true,
   location: __filename
}
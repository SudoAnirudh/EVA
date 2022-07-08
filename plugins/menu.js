exports.run = {
   usage: ['menu', 'help', 'bot'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      let rows = [{
         title: 'DOWNLOADER',
         rowId: `${isPrefix}menutype 1`,
         description: ``
      }, {
         title: 'GROUP TOOLS',
         rowId: `${isPrefix}menutype 2`,
         description: ``
      }, {
         title: 'UTILITIES',
         rowId: `${isPrefix}menutype 3`,
         description: ``
      }, {
         title: 'OWNER TOOLS',
         rowId: `${isPrefix}menutype 4`,
         description: ``
      }]
      let text = 'IAM EVA..A POWERFUL WHATSAPP BOT.\n\n'
      text += '◦ *Database* : PostgreSQL\n'
      text += '◦ *Library* : Baileys v4.3.0\n'
      text += '◦ *Owner Insta* : https://www.instagram.com/ani._.rudh_s/\n'
      text += '◦ *Source* : https://github.com/SudoAnirudh/Eva-Md *(v2.2.0)*\n\n'
      text += 'If you find an error or want to upgrade premium plan contact the owner.'
      await client.sendList(m.chat, '', text, '', 'Tap!', [{
         rows
      }], m)
   },
   error: false
}
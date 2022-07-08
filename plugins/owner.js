exports.run = {
   usage: ['owner'],
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'Owner & Creator'
      }], m)
   },
   error: false,
   owner: true,
   cache: true,
   location: __filename
}
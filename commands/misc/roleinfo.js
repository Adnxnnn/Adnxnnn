module.exports.config  = {
    name: "roleinfo",
    description: 'Get information about a role',
    botperms: ['EMBED_LINKS'],
    aliases: ['role-info', 'role-information', 'roleinformation'],
    usage: '.roleinfo [@role]',
    example: '.roleinfo @Community',
    group: 'misc'
}

const { MessageEmbed, Client, Message } = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 * @returns 
 */

module.exports.run = async(client, message, args) =>{
    const target = message.mentions.roles.first();

        
    if (!target) return message.channel.send(client.main);
    let roleP = target.permissions.toArray()

const embed = new MessageEmbed()
.setColor(client.color)
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`Role info for: \`${target.name}\``)
.addField("Role name:", `${target.name}`, true)
.addField("Role color:", `${target.color}`, true)
.addField('Role hex color:', target.hexColor, true)
.addField("Mention:", `<@&${target.id}>`, true)
.addField('Created AT', target.createdAt.toLocaleTimeString(), true)
.addField("Role ID:", target.id, true)
.addField("Role position", target.position, true)
.addField("Role permissions", "React to see role permissions", true)
.addField('Role Hoist', target.hoist, true)
.addField("Role Mentionable", target.mentionable, true)
.addField("Role Editable", target.editable, true)
.addField("Role managed", target.managed, true)
message.channel.send(embed).then(M => {
    M.react('✅').then((m) => {
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.message.id !== M.id) return;
              if (user.id !== message.author.id) return;
                M.edit(roleP.join('\n').toLowerCase(), {embed: null})   
        })

        client.on('messageReactionRemove', (reaction, user) => {
            if (reaction.message.id !== M.id) return;
            if (user.id !== message.author.id) return;

            M.edit(null, {embed: embed})
        })
    })

})
}
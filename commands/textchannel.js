const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('Creates Text Channel with given name'),
	async execute(interaction) {
		await interaction;
        const channelName = message.content.split(" ").slice(1).join(" ");
    guild.channels
    .create({name: channelName, 
        type: 0,
        //parent: cat[0].ID,
    })
    .then((channel) => {
        console.log(channel)
        const categoryId ='1062143661325955123'
        channel.setParent(categoryId)
    })
    message = " "
	},
};
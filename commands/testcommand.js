const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Ping')
		.setDescription('Sends Pong'),
	async execute(interaction) {
		await interaction.reply('Pong');
	},
};
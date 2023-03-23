const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('EndSemester')
		.setDescription('Ends the semester')
            .addStringOption(option =>
            option
            .setName('class-name')
            .setDescription('the class name to create')
            .setRequired(true),
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		await interaction.reply('Semester Ended!');
	},
};
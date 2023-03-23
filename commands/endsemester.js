const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('endclass')
		.setDescription('Ends the semester')
            .addStringOption(option =>
            option
            .setName('class-name')
            .setDescription('the class name to create')
            .setRequired(true),
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const role = guild.roles.cache.has(role => role.name === interaction.options.data[0].value);
        message.guild.members.cache.forEach(member => {
            member.roles.remove(role);
          });
		await interaction.reply('Semester Ended!');
	},
};
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createrole')
		.setDescription('Creates a new role')
        .addStringOption(option =>
            option
            .setName('role-name')
            .setDescription('the role name to create')
            .setRequired(true),
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const Random1 = Math.Random(0-255)
        const Random2 = Math.Random(0-255)
        const Random3 = Math.Random(0-255)
        const Color = [Random1, Random2, Random3];
        interaction.guild.roles.create({
            name: interaction.options.data[0].value,
            color: Color,
            reason: 'Role created',
        });
        interaction.reply('Role has been created!');
    },
};
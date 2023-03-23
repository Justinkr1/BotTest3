const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createcourse')
		.setDescription('Creates a channel')
        .addStringOption(option => option
            .setName('coursename')
            .setDescription('the new channel to create')
            .setRequired(true),
            )
        /*.addStringOption(option => option
            .setName('categoryname')
            .setDescription('the new category to create')
            .setRequired(true),
            )*/

        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        // console.log(interaction.options.data[0].value);
        if (interaction.options.data[0] === undefined) {
            interaction.guild.channels.create({
                name: interaction.options.data[0].value,
                type: ChannelType.GuildText,
            });
        }
        else {
            const temp = await interaction.guild.channels.create({
                name: interaction.options.data[0].value,
                type: ChannelType.GuildCategory,
            });
            await interaction.guild.channels.create({
                name: "announcements-"+interaction.options.data[0].value.toString() ,
                type: ChannelType.GuildText,
                parent: temp,
            });
            await interaction.guild.channels.create({
                name: "zoom-meeting-info",
                type: ChannelType.GuildText,
                parent: temp,
            });
            await interaction.guild.channels.create({
                name: "how-to-make-a-video",
                type: ChannelType.GuildText,
                parent: temp,
            });
            await interaction.guild.channels.create({
                name: "introduce-yourself",
                type: ChannelType.GuildText,
                parent: temp,
            });
            await interaction.guild.channels.create({
                name: "chat",
                type: ChannelType.GuildText,
                parent: temp,
            });
            }
            interaction.reply('Course has been created!');
    },
};
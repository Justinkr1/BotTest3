const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const fs = require('fs');
/*file = 'hexcode.txt';
fs.readFile('hexcode.txt','utf-8',(err,data) => {
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
})*/


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
        const Random1 = Math.floor(Math.random()*256)
        const Random2 = Math.floor(Math.random()*256)
        const Random3 = Math.floor(Math.random()*256)
        console.log(Random1);
        console.log(Random2);
        console.log(Random3);
        const Color = [Random1, Random2, Random3];
        interaction.guild.roles.create({
            name: interaction.options.data[0].value,
            permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
            color: Color,
            reason: 'Role created',
        });
        const ColorD = [Random1 -Random1*0.15, Random2 -Random2*0.15, Random2 -Random2*0.15];
        interaction.guild.roles.create({
            name: 'Veteran' + interaction.options.data[0].value,
            permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
            color: ColorD,
            reason: 'Veteran Role created',
        });
        interaction.reply('Role has been created!');
    },
};
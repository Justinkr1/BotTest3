const {  Client, GatewayIntentBits, MessageEmbed, SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

const client = new Client({
  Intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const prefix = '/';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === 'enroll') {
    const courses = [
      { number: 'CSC-325', name: 'Data Structures and Algorithms' },
      { number: 'CSC-355', name: 'Database Systems' },
      { number: 'CSC-360', name: 'Operating Systems' },
      { number: 'CSC-375', name: 'Computer Networks' },
    ];

    const courseList = courses
      .map((c, i) => `${i + 1}. ${c.number} - ${c.name}`)
      .join('\n');

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Available Courses')
      .setDescription(courseList);

    const msg = await interaction.reply({ embeds: [embed] });

    courses.forEach((_, i) => {
      msg.react(`${i + 1}\u20E3`);
    });

    const filter = (reaction, user) =>
      user.id === interaction.user.id &&
      /[1-4]\u20E3/.test(reaction.emoji.toString());

    msg.awaitReactions({ filter, max: 1, time: 30000 }).then((collected) => {
      const reaction = collected.first();

      if (!reaction) {
        interaction.followUp("You didn't react with any number in time.");
      } else {
        const selectedCourse = courses[Number(reaction.emoji.name[0]) - 1];

        interaction.followUp(
          `You have enrolled in ${selectedCourse.number} - ${selectedCourse.name}`
        );
      }
    });
  }
});

const enrollCommand = new SlashCommandBuilder()
  .setName('enroll')
  .setDescription('Enroll in a course');

enrollCommand.addStringOption((option) =>
  option
    .setName('class-name')
    .setDescription('The class name to enroll in')
    .setRequired(true)
);

client.on('ready', async () => {
  const commands = [enrollCommand];
  const guildId = 'YOUR GUILD ID';

  try {
    const commandList = await client.guilds.cache.get(guildId)?.commands.set(commands);
    console.log('Slash commands registered:\n', commandList);
  } catch (error) {
    console.error(error);
  }
});

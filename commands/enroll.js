
const { Client, GatewayIntentBits, MessageEmbed, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enroll1st')
		.setDescription('Enroll in a course')
        .addStringOption(option =>
            option
            .setName('class-name')
            .setDescription('the class name to create')
            .setRequired(true),
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

   {
    const courses = [
      { number: "CSC-325", name: "Data Structures and Algorithms" },
      { number: "CSC-355", name: "Database Systems" },
      { number: "CSC-360", name: "Operating Systems" },
      { number: "CSC-375", name: "Computer Networks" },
    ];

    const courseList = courses
      .map((c, i) => `${i + 1}. ${c.number} - ${c.name}`)
      .join("\n");

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Available Courses")
      .setDescription(courseList);

    message.channel.send({ embeds: [embed] }).then((msg) => {
      courses.forEach((_, i) => {
        msg.react(`${i + 1}\u20E3`);
      });

      const filter = (reaction, user) =>
        user.id === message.author.id &&
        /[1-4]\u20E3/.test(reaction.emoji.toString());

      msg.awaitReactions({ filter, max: 1, time: 30000 }).then((collected) => {
        const reaction = collected.first();

        if (!reaction) {
          message.reply("You didn't react with any number in time.");
        } else {
          const selectedCourse = courses[Number(reaction.emoji.name[0]) - 1];

          message.channel.send(
            `You have enrolled in ${selectedCourse.number} - ${selectedCourse.name}`
          );
        }
      });
    });
  }
});
}
}

const { Client, GatewayIntentBits, MessageEmbed, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

/*const prefix = "/";

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === "enroll") {
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
*/
module.exports = {
  data: new SlashCommandBuilder()
    .setName("enroll")
    .setDescription("Enroll in a course")
    .addStringOption((option) =>
      option
        .setName("class-name")
        .setDescription("the class name to create")
        .setRequired(true)
    )

    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
      console.log('it works before client.on')
      client.on("interactionCreate", async (interaction) => {
        console.log('it works before');
        if (!interaction.isCommand()) return;
        console.log('it works');
        const { commandName } = interaction;
        //if (commandName === "enroll") {
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
        //}
      });
}
}
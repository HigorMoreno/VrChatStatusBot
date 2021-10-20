const { SlashCommandBuilder } = require('@discordjs/builders');
const vrchat = require("vrchat");

const { user } = require('../config.json');
const configuration = new vrchat.Configuration(user);
const AuthenticationApi = new vrchat.AuthenticationApi(configuration);
const FriendsApi = new vrchat.FriendsApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
	.setName('online')
	.setDescription('List online vrchat users.'),
	async execute(interaction) {
		AuthenticationApi.getCurrentUser().then(resp => {
			FriendsApi.getFriends().then(async resp =>{
				var result = `Usuários Online: ${resp.data.length}\n`;
				resp.data.forEach(x=> result += `${x.displayName}\n`)
				
				await interaction.reply(result)
			});
		});
	},
};


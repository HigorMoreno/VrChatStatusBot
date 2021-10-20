const { SlashCommandBuilder } = require('@discordjs/builders');
const vrchat = require("vrchat");

const { user } = require('../config.json');
const configuration = new vrchat.Configuration(user);
const AuthenticationApi = new vrchat.AuthenticationApi(configuration);
const FriendsApi = new vrchat.FriendsApi(configuration);
const UsersApi = new vrchat.UsersApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
	.setName('add')
	.setDescription('Request to add your VrChat user to friends list.')
    .addStringOption(option => option.setName('name').setDescription('Enter your VrChat User Name')),
	async execute(interaction) {
        var result = '';
		const name = interaction.options.getString('name');
        AuthenticationApi.getCurrentUser().then(resp =>{
            UsersApi.getUserByName(name).then(resp =>{
                FriendsApi.friend(resp.data.id).then(resp =>{
                    result = `Friend request sent to ${name} on VrChat.`
                }).catch(error =>{
                    result = 'Error trying to add the user';
                });
            }).catch(error =>{
                result = 'VrChat User not found';
            });
        });

        await interaction.reply(result);
	},
};


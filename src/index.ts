import DiscordJS, { ApplicationCommand, ApplicationCommandPermissionData, ApplicationCommandPermissionType, Client, Collection, CommandInteraction, Guild, Intents, Interaction } from 'discord.js'
import { connectDatabase } from "./database/connectDatabase"
import { CommandInt } from './interfaces/CommandInt';
import { readdirRecursive } from './utils/readdirRecursive';

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.login(process.env.TOKEN);

client.on('ready', async () => {
    // connect to the DB
    console.log("Conencting to database...");
    await connectDatabase();

    // load commands
    console.log("Loading commands...");
    client.commands = new Collection();
    const { commands } = client.guilds.cache.get('679777315814637683') as Guild;
    const commandFiles = readdirRecursive(`${__dirname}/commands`).filter(file => file.endsWith('.js'));
    const awaitedCommands: Promise<ApplicationCommand>[] = [];

    for (const file of commandFiles) {
        const commandModule = await import(file);

        const dirs = file.split('/');
		const name = dirs[dirs.length - 1].split('.')[0];

        if (!(typeof commandModule.default === 'function')) {
			console.log(`Invalid command ${name}`);
			continue;
		}

        const command: CommandInt = new commandModule.default;

        command.name = name;

        const guildCmd = commands.cache.find(cmd => cmd.name === command.name);

        const cmdData = {
            name: command.name,
            description: command.description,
            options: command?.options || [],
            defaultPermission: true // allow commands to be used by anyone
        }

        if (!guildCmd) {
            awaitedCommands.push(commands.create(cmdData));
        } else {
            awaitedCommands.push(commands.edit(guildCmd.id, cmdData));
        }
        
        client.commands.set(name, command);

        console.log(cmdData.defaultPermission);
    }

    // done with everything now!
    console.log('Ready!');
})

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) runCommand(interaction, client);
})

async function runCommand(interaction: CommandInteraction, client: Client): Promise<unknown> {
    const command = client.commands.get(interaction.commandName);

    if (command.slashRun !== undefined) {
        try {
            command.slashRun(interaction)
                ?.catch(async (error: Error) => {
                    interaction.reply(`Sorry, an error occured: ${error.message}`);
                }); 
        } catch (error) {
            console.log(error);
        }
    }

    return;
}
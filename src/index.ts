import DiscordJS, { Intents } from 'discord.js'
import { connectDatabase } from "./database/connectDatabase"
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./events/onMessage";

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.login(process.env.TOKEN);

client.on('ready', async () => {
    await connectDatabase();
    console.log('Ready!');
})

client.on("messageCreate", async (message) => await onMessage(message));
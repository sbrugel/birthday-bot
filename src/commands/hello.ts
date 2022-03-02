import { CommandInteraction, Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";

export default class extends CommandInt {
    name = 'hello';
    description = 'Hello world!';
    slash = true;
    async run(message: Message): Promise<void> { return; }
    async slashRun(interaction: CommandInteraction): Promise<void> {
        await interaction.reply(`Hello World!`);
    }
}
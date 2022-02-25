import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onMessage = async (message: Message) => {
    console.log("here!!!");
    const prefix = "?";
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    console.log("here!!!!");
    for (const Command of CommandList) {
        if (message.content.startsWith(prefix + Command.name)) {
            await Command.run(message);
            break;
        }
    }
};
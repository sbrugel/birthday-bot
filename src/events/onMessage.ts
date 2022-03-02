import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onMessage = async (message: Message) => {
    const prefix = "?";
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    for (const Command of CommandList) {
        if (!Command.slash) {
            if (message.content.startsWith(prefix + Command.name)) {
                await Command.run!(message);
                break;
            }
        }
    }
};
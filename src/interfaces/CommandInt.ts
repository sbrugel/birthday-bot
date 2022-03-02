import { ApplicationCommandOptionData, ApplicationCommandPermissionData, CommandInteraction, Interaction, Message } from "discord.js";

export abstract class CommandInt {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];

    abstract slashRun?(interaction: CommandInteraction): Promise<void>;
}
import { ApplicationCommandOptionData, ApplicationCommandPermissionData, CommandInteraction, Interaction, Message } from "discord.js";

export abstract class CommandInt {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    slash: boolean;
    permissions?: ApplicationCommandPermissionData[] = [{
		id: '679780540035235905',
		type: 'ROLE',
		permission: true
	}];

    abstract run?(message: Message): Promise<void>;
    abstract slashRun?(interaction: CommandInteraction): Promise<void>;
}
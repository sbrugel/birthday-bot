import { Collection } from "discord.js";
import { Db } from 'mongodb'

declare module 'discord.js' {
    interface Client {
        mongo: Db;
        commands: Collection<string, Command>;
    }
}
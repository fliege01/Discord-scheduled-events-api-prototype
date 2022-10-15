import * as dotenv from 'dotenv';

dotenv.config()

import {Client, IntentsBitField} from 'discord.js';

(async () => {
	const client = new Client({intents: [IntentsBitField.Flags.GuildScheduledEvents]});

	await client.login(process.env.DISCORD_TOKEN);

	let guild = await client.guilds.fetch(process.env.DISCORD_TARGET_GUILD); // Fetch target guild

	// Create scheduled event
	let newScheduledEvent = await guild.scheduledEvents.create({
		name: 'A very special event name',
		scheduledStartTime: new Date(Date.now() + 1000 * 60 * 10), // now + 10m
		scheduledEndTime: new Date(Date.now() + 1000 * 60 * 60), // now + 1h
		entityType: 3,
		privacyLevel: 2,
		description: 'Testbeschreibung für das Event',
		reason: 'some reason for the audit log',
		entityMetadata: {
			location: 'Somewhere over the rainbow'
		}
	});

	// mark event as active
	await new Promise(resolve => setTimeout(resolve, 2000));
	await guild.scheduledEvents.edit(newScheduledEvent, {status: 2});

	// delete event
	await new Promise(resolve => setTimeout(resolve, 1000 * 30));
	await guild.scheduledEvents.delete(newScheduledEvent);

	// Client logout
	await client.destroy();
})()



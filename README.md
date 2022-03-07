# birthday-bot
Discord bot that announces user-inputted birthdays in a guild. Users can enter their birth month/day and optionally year and on their birthday, a message will be automatically sent in a channel specified in the .env file, wishing that user a happy birthday:

![Discord_VfQkVkIgcS](https://user-images.githubusercontent.com/58154576/157116233-f6a4ea44-7f7a-449d-93ef-db05598292c0.png)

(The top is shown if the user does not input their birth year, the bottom if so.) The birthdays are subsequently stored in a database for future access.

## Commands
### /setbirthday
Set your birthday month, date, and (optionally) year. Will add your birthday to the DB if your data doesn't already exist on there, modifies it otherwise.

## To do
- [ ] if no year specified, make it not say "1900"
- [ ] command to remove birthday
- [ ] potentially make this work with config.json files too?
- [ ] user settable pronouns in /setbirthday

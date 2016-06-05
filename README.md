# Codenames

## Development

`npm install` - to install dependencies
`grunt` - will watch for changes to CSS and JS files and build automatically
`grunt build` - builds CSS and JS for publishing

## Game Rules

- 4-8 players (best with ~6 people)
- Split team members up into two teams and choose a spy master for each team
- Only the spy master's may look at the "key" (the version of the board that shows what color each card is)
- The board will contain 8/9 blue and red cards. The team that goes first will have one additional card. There will be 7 bystanders and one assassin.
- If a team chooses the assassin during the game, they automatically lose
- Spymaster's take turn giving a clue to their team
- For the clue the spymaster will say a single word and a number. The word is a hint for one or more of their team's cards. The number tells the team members how many cards it applies to.
- The turn is over when they get one wrong or they use up all their guesses. The number of guesses you get is the number the spymaster says plus a bonus guess.
- You can choose to stop guessing at any time.
- The game ends when a team guesses all cards of their color or if the black card is chosen.

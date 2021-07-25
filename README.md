# Guess My Number

Guess My Number is a browser game where you try to guess a secret number. It was built as an exercise for practicing javascript and DOM manipulation.

## How the game works

- You have 8 chances to guess a secret number from 1 to 20;
- You start every round with a round score of 20;
- For each attempt, the game tells you whether your number is higher or lower than the secret number;
- If you guess wrong, the round score decreases (-1 if it's the first attempt, -2 if it's the second, -3 if it's the third, and so on);
- If you guess right, the round score remaining amount is added to your total score. A new round begins, you receive 2 extra chances and the round score goes back to 20;
- The game ends when you don't have anymore chances;

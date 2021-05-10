const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What password? `, (password: string) => {
  console.log(`The password is ${password}!`);
  readline.question(
    `What should the password be used for? `,
    (usage: string) => {
      console.log(`Password usage: ${usage}!`);
      readline.close();
    }
  );
});

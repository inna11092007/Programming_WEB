function* chatBot() {
  const name = yield "Hi! What is your name?";
  const mood = yield `Nice to meet you, ${name}! How are you?`;
  yield `Goodbye, ${name}! I’m glad you’re feeling ${mood}.`;
}

const bot = chatBot();

let question = bot.next().value;

while (true) {
  const answer = prompt(question);
  
  const nextStep = bot.next(answer);
  
  if (nextStep.done) {
    alert(nextStep.value);
    break;
  }
  
  question = nextStep.value;
}

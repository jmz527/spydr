const repl = require('repl');
require('dotenv').config();
const welcomeText = require('./welcome_text');

const cmds = require('./commands');
const isOnline = require('./collectors').isOnline;

(async () => {
  try {
    const online = await isOnline();

    if (online) {
      console.log(welcomeText);
      repl.start({
        terminal: true,
        useColors: true,
        input: process.stdin,
        output: process.stdout,
        prompt: `Җ: `,
        eval: async (input, context, filename, callback) => {
          let cmd = input.split(/\s+/)[0];
          await (cmds[cmd] || cmds["default"])(input, context);

          // FileUtil.logThis(`\x1b[0m`, result);
          callback(null);
        }
      });
    } else {
      throw new Error('Can\'t connect to the Spydr API');
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

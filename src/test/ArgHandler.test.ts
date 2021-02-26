import { ArgHandler } from "../ArgHandler";
import testData = require('./data/ArgHandlerTestData');
import { Arguments } from "../interface/Arguments";

describe('ArgHandler Tests', () => {
  it('throws if getInstance is called before ArgHandler is initialized', () => {
    expect(() => {
      ArgHandler.getInstance
    }).toThrow();
  });

  it('returns a singleton ArgHandler instance', () => {
    ArgHandler.config(testData.basicTestArgs.slice(2))
      .command({
        name: 'command',
        handler(args: Arguments) {
          return;
        }
      })
      .build();

    expect(ArgHandler.getInstance).toBeDefined();
  });
});

describe('parseArgs tests', () => {
  it('splits args if first token is node', () => {
    ArgHandler.config(testData.basicTestArgs)
      .command({
        name: 'command',
        handler(args: Arguments) {
          return;
        }
      })
  })

  it('throws if an unknown command is passed in the arguments', () => {
    expect(() => {
      ArgHandler.config(testData.basicTestArgs)
        .build();
    })
      .toThrow();
  });

  it.todo('checks for and sets positional option values');

  it.todo('checks for required options');

  it.todo('throws if required options are not provided');

  it.todo('checks for and sets option values');

});

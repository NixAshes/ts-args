import ArgHandlerFactory from '../ArgHandlerFactory';
import { Arguments } from '../interface/Arguments';
import { ArgHandler } from '../ArgHandler';

import externalData = require('./data/ArgHandlerFactoryTestData');

describe('ArgHandlerFactory test', () => {
  let factory: ArgHandlerFactory;

  beforeAll(() => {
    factory = new ArgHandlerFactory([]);
  });

  it('returns an ArgHandlerFactory instance', () => {
    expect(factory).toBeInstanceOf(ArgHandlerFactory);
  });
});

describe('Command configuration tests', () => {
  it('adds a command to the configuration', () => {
    ArgHandler.config(['aCommand'])
      .command({
        name: 'aCommand',
        handler(args: Arguments) {
          return;
        },
      })
      .build();

    expect(ArgHandler.getConfig.getCommand('aCommand')).toBeDefined();
  });

  it('adds multiple commands to the configuration', () => {
    ArgHandler.config(['command1']).commands([
      {
        name: 'command1',
        handler(args: Arguments) {
          return;
        },
      },
      {
        name: 'command2',
        handler(args: Arguments) {
          return;
        },
      },
    ]);

    expect(ArgHandler.getConfig.getCommand('command1')).toBeDefined();
    expect(ArgHandler.getConfig.getCommand('command2')).toBeDefined();
  });

  it('adds a command from an external file', () => {
    ArgHandler.config(['externalCommand1'])
      .command(externalData.externalCommand1)
      .build();

    expect(ArgHandler.getConfig.getCommand('externalCommand1')).toBeDefined();
  });

  it('adds an array of commands from an external file', () => {
    ArgHandler.config(['externalCommand2'])
      .commands(externalData.externalTestCommandList)
      .build();

    expect(ArgHandler.getConfig.getCommand('externalCommand2')).toBeDefined();
    expect(ArgHandler.getConfig.getCommand('externalCommand3')).toBeDefined();
  });
});

describe('Option configuration tests', () => {
  it('adds a global option to the configuration', () => {
    ArgHandler.config(['temp'])
      .command({
        name: 'temp',
        handler(args: Arguments) {
          return;
        },
      })
      .globalOption({
        name: 'anOption',
      })
      .build();

    expect(ArgHandler.getConfig.getGlobalOption('anOption')).toBeDefined();
  });

  it('adds multiple global options to the configuration', () => {
    ArgHandler.config(['temp'])
      .command({
        name: 'temp',
        handler(args: Arguments) {
          return;
        },
      })
      .globalOptions([
        {
          name: 'option1',
        },
        {
          name: 'option2',
        },
      ])
      .build();

    expect(ArgHandler.getConfig.getGlobalOption('option1')).toBeDefined();
    expect(ArgHandler.getConfig.getGlobalOption('option2')).toBeDefined();
  });

  it('adds a global option from an external file', () => {
    ArgHandler.config(['temp'])
      .command({
        name: 'temp',
        handler(args: Arguments) {
          return;
        },
      })
      .globalOption(externalData.externalGlobalOption)
      .build();

    expect(
      ArgHandler.getConfig.getGlobalOption('externalOption1')
    ).toBeDefined();
  });

  it('adds an array of global options from an external file', () => {
    ArgHandler.config(['temp'])
      .command({
        name: 'temp',
        handler(args: Arguments) {
          return;
        },
      })
      .globalOptions(externalData.externalOptions)
      .build();

    expect(
      ArgHandler.getConfig.getGlobalOption('externalOption2')
    ).toBeDefined();
    expect(
      ArgHandler.getConfig.getGlobalOption('externalOption3')
    ).toBeDefined();
  });
});

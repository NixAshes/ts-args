import ArgConfiguration from '../ArgConfiguration';
import { Arguments } from '../interface/Arguments';

describe('ArgConfiguration test', () => {
  let config: ArgConfiguration;

  beforeAll(() => {
    config = ArgConfiguration.getInstance;
  });

  it('returns an object', () => {
    expect(config).toBeDefined();
  });

  it('returns an ArgConfiguration object', () => {
    expect(config).toBeInstanceOf(ArgConfiguration);
  });

  it('returns a singleton', () => {
    expect(Object.is(ArgConfiguration.getInstance, config)).toBe(true);
  });

  it('adds a single command to the configuration', () => {
    config.command({
      name: 'testCommand',
      handler(args: Arguments): void {
        return;
      },
    });

    expect(config.getCommand('testCommand')).toBeDefined();
  });

  it('adds command aliases to the command list', () => {
    config.command({
      name: 'commandWithAlias',
      alias: 'commandWithAlias-Alias',
      handler(args: Arguments) {
        return;
      },
    });

    expect(config.getCommand('commandWithAlias-Alias')).toBe(
      config.getCommand('commandWithAlias')
    );
  });

  it('adds commands with multiple aliases to the command list', () => {
    config.command({
      name: 'commandWithMultAliases',
      alias: ['commandWithMultAliases-Alias1', 'commandWithMultAliases-Alias2'],
      handler(args: Arguments) {
        return;
      },
    });

    expect(config.getCommand('commandWithMultAliases-Alias1')).toBe(
      config.getCommand('commandWithMultAliases-Alias2')
    );
  });

  it('detects and sets positional arguments', () => {
    config.command({
      name: 'testCommandWithRequiredPositional',
      usage: '$0 testCommandWithPositional <requiredPos>',
      positionalOptions: [
        {
          name: 'unusedPositional',
          tokenPos: 3
        }
      ],
      handler(args: Arguments) {
        return;
      },
    });

    expect(
      config.getCommand('testCommandWithRequiredPositional').positionalOptions
    ).toBeDefined();
  });

  // TODO code a better way to retrieve command options/positional options
  it('detects when a positional is required', () => {
    expect(
      config.getCommand('testCommandWithRequiredPositional')
        .positionalOptions![1].required // TODO THIS IS BAD FIX THIS
    ).toBe(true);
  });

  it('detects when a positional is optional', () => {
    config.command({
      name: 'testCommandWithOptionalPositional',
      usage: 'testCommandWithOptionalPositional [optionalPos]',
      handler(args: Arguments) {
        return;
      },
    });

    expect(
      config.getCommand('testCommandWithOptionalPositional')
        .positionalOptions![0].required
    ).toBeFalsy();
  });

  it("properly assigns the positional option's token index", () => {
    config.command({
      name: 'testCommandPositionalToken',
      usage: '$0 testCommandPositionalToken <positional>',
      handler(args: Arguments) {
        return;
      },
    });

    expect(
      config.getCommand('testCommandPositionalToken').positionalOptions![0]
        .tokenPos
    ).toBe(2);
  });

  it('validates explicit positional options', ()=> {
    config.command({
      name: 'commandWithPositional',
      usage: '$0 commandWithPositional <positionalOpt>',
      positionalOptions: [{
        name: 'positionalOpt',
        tokenPos: 2
      }],
      handler(args: Arguments) {
        return;
      }
    });

    expect(config.getCommand('commandWithPositional')).toBeDefined();
  });

  it('throws when invalid positional usage is entered', () => {
    expect ( () => {
      config.command({
        name: 'commandWithBadPositional',
        usage: '$0 commandWithBadPositional <badPositional>',
        positionalOptions: [
          {
            name: 'badPositional',
            tokenPos: 3
          }
        ],
        handler(args: Arguments) {
          return;
        }
      })
    }).toThrow();

  })

  it('throws if unlisted command is requested', () => {
    const commandName = 'badCommand';
    expect(() => {
      config.getCommand(commandName);
    }).toThrow();
  });

  it('adds a single global option to the configuration', () => {
    config.globalOption({
      name: 'globalOption1',
    });

    expect(config.getGlobalOption('globalOption1')).toBeDefined();
  });

  it('adds option aliases to the option list', () => {
    config.globalOption({
      name: 'globalOptionWithAlias',
      alias: 'globalOptionAlias',
    });

    expect(config.getGlobalOption('globalOptionAlias')).toBe(
      config.getGlobalOption('globalOptionWithAlias')
    );
  });

  it('adds options with multiple aliases to the command list', () => {
    config.globalOption({
      name: 'globalOptionWithMultAliases',
      alias: ['globalOptionWithMultAliases-1', 'globalOptionWithMultAliases-2'],
    });

    expect(config.getGlobalOption('globalOptionWithMultAliases-1')).toBe(
      config.getGlobalOption('globalOptionWithMultAliases-2')
    );
  });

  it('throws if unlisted global option is requested', () => {
    const optionName = 'badOption';
    expect(() => {
      config.getGlobalOption(optionName);
    }).toThrow();
  })

  it('returns the list of commands', () => {
    const commandList = config.commandList;

    expect(commandList).toBeInstanceOf(Array);
  })
});

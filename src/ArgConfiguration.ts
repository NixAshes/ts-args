import { Command } from './interface/Command';
import { Option } from './interface/Option';
import { PositionalOption } from './interface/PositionalOption';
import { TSArgError } from './TSArgError';

export default class ArgConfiguration {
  private commands: Map<string, Command>;
  private globalOptions: Map<string, Option>;
  private static instance: ArgConfiguration;

  constructor() {
    this.commands = new Map<string, Command>();
    this.globalOptions = new Map<string, Option>();
  }

  /**
   * Retrieves the single instance of ArgConfiguration. If no ArgConfiguration
   * instance is initialized, initializes a blank instance.
   *
   * @returns singleton instance of ArgConfiguration
   */
  static get getInstance(): ArgConfiguration {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ArgConfiguration();
      return this.instance;
    }
  }

  /**
   * Adds configuration for the specified command to the ArgConfiguration,
   * allowing it to be called at the command line.
   *
   * @param command
   * @returns this ArgConfiguration instance
   */
  // TODO validate structure of command
  // TODO add in collision checking to prevent duplicate global and command-level options
  // TODO add in checking to make sure not overwriting a command
  command(command: Command ): ArgConfiguration {
    // detect and set positional options
    command = this.setPositionals(command);

    this.commands.set(command.name, command);

    if (command.alias) {
      if (command.alias instanceof Array) {
        command.alias.forEach((alias) => {
          this.commands.set(alias, command);
        });
      } else {
        this.commands.set(command.alias, command);
      }
    }
    return this;
  }

  /**
   * Returns the command with the provided name.
   *
   * @param commandName string
   * @returns a Command instance
   */
  getCommand(commandName: string): Command {
    const command = this.commands.get(commandName);

    if (!command) {
      throw new TSArgError(
        `Command ${commandName} not found. Have you checked --help?`
      );
    }

    return command;
  }


  /**
   * Returns the list of commands (and their aliases) loaded into this configuration instance
   *
   * @returns the list of command names and aliases, as an array of strings
   */
  get commandList(): Array<string> {
    const commandList: Array<string> = [];

    // add command names to list
    this.commands.forEach((command) => {
      commandList.push(command.name);
    });

    return commandList;
  }


  /**
   * Detects and sets positional options in a command.
   *
   * @param command Command
   * @returns the command instance passed, with positional arguments set
   */
  setPositionals(command: Command): Command {
    // tokenize command
    if (command.usage) {
      const tokens = command.usage.split(' ');

      // strip off '$0' if necessary
      if (tokens[0] === '$0') {
        tokens.shift();
      }

      // check tokens for <> and []
      let posOpt: PositionalOption;
      tokens.forEach((token, index) => {
        if (token.startsWith('<') && token.endsWith('>')) {
          posOpt = {
            name: token.substring(1, token.length - 1),
            tokenPos: index + 1,
            required: true,
          };
        } else if (token.startsWith('[') && token.endsWith(']')) {
          posOpt = {
            name: token.substring(1, token.length - 1),
            tokenPos: index + 1,
          };
        }

        // configure positional
        if (posOpt) {
          // check command for explicit positional definitions
          if (command.positionalOptions) {
            let match = false;

            command.positionalOptions.forEach((option) => {
              if (option.name === posOpt.name) {
                match = true;

                // validate option parameters
                if (option.tokenPos !== posOpt.tokenPos) {
                  throw new TSArgError(
                    'Positional option usage definition does not match explicit definition.' +
                    'This is a code error; please contact the developer for a fix.'
                  );
                }
              }
            });

            if (!match) {
              command.positionalOptions.push(posOpt);
            }
          } else {
            command.positionalOptions = [posOpt];
          }
        }
      });
    }

    return command;
  }


  /**
   * Adds configuration for the specified global option to the ArgConfiguration,
   * allowing it to be used with any command at the command line.
   *
   * @param option
   * @returns this ArgConfiguration instance
   */
  // TODO validate structure of option
  // TODO add in checking to make sure not overwriting an option
  globalOption(option: Option): ArgConfiguration {
    this.globalOptions.set(option.name, option);

    if (option.alias) {
      if (option.alias instanceof Array) {
        option.alias.forEach((alias) => {
          this.globalOptions.set(alias, option);
        });
      } else {
        this.globalOptions.set(option.alias, option);
      }
    }

    return this;
  }

  /**
   * Returns the option with the provided name.
   *
   * @param optionName string
   * @returns an Option instance
   */
  getGlobalOption(optionName: string): Option {
    const globOpt = this.globalOptions.get(optionName);

    if (!globOpt) {
      throw new TSArgError(`Option ${optionName} not found. Have you checked --help?`);
    }

    return globOpt;
  }
}

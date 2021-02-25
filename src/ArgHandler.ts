import { Arguments } from './interface/Arguments';
import { Command } from './interface/Command';
import { Option } from './interface/Option';
import { PositionalOption } from './interface/PositionalOption';
import ArgConfiguration from './ArgConfiguration';

export class ArgHandler {
  private args: Arguments;
  private config: ArgConfiguration;
  current: Command;

  private static instance: ArgHandler;

  private constructor(argv: Array<string>) {
    this.config = ArgConfiguration.getInstance;
    this.args = this.parseArgs(argv);
    this.current = this.args.command;
  }

  static get getInstance(): ArgHandler {
    return this.instance;
  }

  static initialize(argv: Array<string>): ArgHandler.ArgHandlerFactory {
    return new ArgHandler.ArgHandlerFactory(argv);
  }

  private parseArgs(argv: Array<string>): Arguments {
    let args: Arguments;
    // check whether first arg is in command list
    if (!this.config.commandList.includes(argv[0])) {
      throw new TSArgError(`Error: Command ${argv[0]} not found.`);
    } else {
      args = {
        command: this.config.getCommand(argv[0]),
      };
    }

    // check for required positional options
    if (args.command.positionalOptions) {
      args.command.positionalOptions.forEach((option) => {
        if (option.required) {
          //TODO start here tomorrow!
        }
      });
    }

    return args;
  }

  static ArgHandlerFactory = class {
    config: ArgConfiguration;
    argv: Array<string>;

    constructor(argv: Array<string>) {
      this.config = ArgConfiguration.getInstance;
      this.argv = argv;
    }

    public command(command: Command): ArgHandler.ArgHandlerFactory {
      this.config.command(command);

      return this;
    }

    public commands(commands: Array<Command>): ArgHandler.ArgHandlerFactory {
      commands.forEach((command): void => {
        this.config.command(command);
      });

      return this;
    }

    public globalOption(option: Option): ArgHandler.ArgHandlerFactory {
      this.config.globalOption(option);
      return this;
    }

    public globalOptions(options: Array<Option>): ArgHandler.ArgHandlerFactory {
      options.forEach((option): void => {
        this.config.globalOption(option);
      });
      return this;
    }

    public build(): void {
      ArgHandler.instance = new ArgHandler(this.argv);
    }
  };


}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ArgHandler {
  export type ArgHandlerFactory = InstanceType<
    typeof ArgHandler.ArgHandlerFactory
  >;
}

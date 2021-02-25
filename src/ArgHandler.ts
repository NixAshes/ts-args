import { Arguments } from './interface/Arguments';
import { Command } from './interface/Command';
import { TSArgError } from "./TSArgError";
import ArgConfiguration from './ArgConfiguration';
import ArgHandlerFactory from "./ArgHandlerFactory";


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

  static config(argv: Array<string>): ArgHandlerFactory {
    return new ArgHandlerFactory(argv);
  }

  static initialize(argv: Array<string>): void {
    this.instance = new ArgHandler(argv);
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

}

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

    ArgHandler.instance = this;
  }

  static get getInstance(): ArgHandler {
    if (this.instance) {
      return this.instance;
    }
    else {
      throw new TSArgError('ArgHandler is not initialized!');
    }
  }

  static config(argv: Array<string>): ArgHandlerFactory {
    return new ArgHandlerFactory(argv);
  }

  static initialize(argv: Array<string>): void {
    this.instance = new ArgHandler(argv);
  }

  private parseArgs(argv: Array<string>): Arguments {
    let args: Arguments;
    // check whether first arg is node
    if (argv[0] === 'node') {
      argv = argv.slice(2);
    }
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

  static get getConfig(): ArgConfiguration {
    return this.instance.config;
  }

  static get getArgs(): Arguments {
    return this.instance.args;
  }

}

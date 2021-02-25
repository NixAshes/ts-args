import ArgConfiguration from "./ArgConfiguration";
import { Command } from "./interface/Command";
import { Option } from "./interface/Option";
import { ArgHandler } from "./ArgHandler";

export default class ArgHandlerFactory {
  config: ArgConfiguration;
  argv: Array<string>;

  constructor(argv: Array<string>) {
    this.config = ArgConfiguration.getInstance;
    this.argv = argv;
  }

  public command(command: Command): ArgHandlerFactory {
    this.config.command(command);

    return this;
  }

  public commands(commands: Array<Command>): ArgHandlerFactory {
    commands.forEach((command): void => {
      this.config.command(command);
    });

    return this;
  }

  public globalOption(option: Option): ArgHandlerFactory {
    this.config.globalOption(option);
    return this;
  }

  public globalOptions(options: Array<Option>): ArgHandlerFactory {
    options.forEach((option): void => {
      this.config.globalOption(option);
    });
    return this;
  }

  public build(): void {
    ArgHandler.initialize( this.argv );
  }
}

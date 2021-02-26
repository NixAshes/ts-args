import ArgConfiguration from "./ArgConfiguration";
import { Command } from "./interface/Command";
import { Option } from "./interface/Option";
import { ArgHandler } from "./ArgHandler";

export default class ArgHandlerFactory {
  private config: ArgConfiguration;
  private readonly argv: Array<string>;

  constructor(argv: Array<string>) {
    this.config = ArgConfiguration.getInstance;
    this.argv = argv;
  }

  /**
   * Adds the passed command to the command list.
   *
   * @param command the command to be added to the command list
   * @returns this ArgHandlerFactory instance for chaining
   */
  public command(command: Command): ArgHandlerFactory {
    this.config.command(command);

    return this;
  }

  /**
   * Adds an array of commands to the command list.
   *
   * @param commands the array of commands to be added to the command list
   * @returns this ArgHandlerFactory instance for chaining
   */
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

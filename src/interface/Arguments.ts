import { Command } from './Command';
import { Option } from './Option';

export interface Arguments {
  command: Command;
  globalOptions?: Array<Option>;
  commandOptions?: Array<Option>;
}

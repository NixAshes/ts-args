import { Option } from './Option';
import { Arguments } from './Arguments';
import { PositionalOption } from './PositionalOption';

export interface Command extends Option {
  positionalOptions?: Array<PositionalOption>;
  options?: Array<Option>;
  handler(args: Arguments): void;
}

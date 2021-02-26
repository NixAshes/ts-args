import { Command } from '../../interface/Command';
import { Arguments } from '../../interface/Arguments';
import { Option } from '../../interface/Option';

export const externalTestCommandList: Array<Command> = [
  {
    name: 'externalCommand2',
    handler(args: Arguments) {
      return;
    },
  },
  {
    name: 'externalCommand3',
    handler(args: Arguments) {
      return;
    },
  },
];

export const externalCommand1: Command = {
  name: 'externalCommand1',
  handler(args: Arguments) {
    return;
  },
};

export const externalGlobalOption: Option = {
  name: 'externalOption1',
};

export const externalOptions: Array<Option> = [
  {
    name: 'externalOption2',
  },
  {
    name: 'externalOption3',
  },
];

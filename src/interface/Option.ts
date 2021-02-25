export interface Option {
  name: string;
  alias?: string | Array<string>;
  required?: boolean;
  usage?: string;
}

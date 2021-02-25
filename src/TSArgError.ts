export class TSArgError extends Error {

  constructor(message: string) {
    super();
    this.name = 'TSArgError';
    this.message = message;
  }

}

import { MaestroError } from "./maestro";

export class EventError extends MaestroError {
  static get ThrowsNotAnEvent(): never {
    throw new EventError();
  }
  static get ThrowsNotAssignable(): never {
    throw new EventError();
  }
}

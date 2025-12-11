import { MaestroError } from "./maestro";

export class ComponentError extends MaestroError {
  static get ThrowsNotAComponent(): never {
    throw new ComponentError();
  }
  static get ThrowsIdIsNotAssignable(): never {
    throw new ComponentError();
  }
}

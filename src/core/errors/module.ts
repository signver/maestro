import { MaestroError } from "./maestro";

export class ModuleError extends MaestroError {
  static get ThrowsNotFound(): never {
    throw new ModuleError();
  }
}

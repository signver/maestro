import { ComponentError } from "./errors";
import { lineage } from "../utils";

export abstract class Component extends EventTarget {
  static #idProperty = "__maestrocomponentid";

  static idOf<T extends Component>(target: T): Symbol;
  static idOf<T extends Component, U extends { new (...args: any[]): T }>(
    target: U
  ): Symbol;
  static idOf(target: unknown) {
    if (target instanceof Component) {
      return Component.idOf(
        target.constructor as { new (...args: any[]): Component }
      );
    }

    if (!(target && Array.from(lineage(target)).includes(Component))) {
      ComponentError.ThrowsNotAComponent;
    }

    if (Object.hasOwn(target as object, Component.#idProperty)) {
      return target[this.#idProperty];
    }
    const id = Symbol();
    Object.defineProperty(target, this.#idProperty, {
      configurable: false,
      enumerable: false,
      get() {
        return id;
      },
      set() {
        ComponentError.ThrowsIdIsNotAssignable;
      },
    });
    return id;
  }
}

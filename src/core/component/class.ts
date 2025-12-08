import { NotAComponentError } from "./errors";

export class Component extends EventTarget {
  static get version() {
    return "1.0.0";
  }

  static #idProp = "__componentid" as const;

  static get cid(): string {
    if (!Object.hasOwn(this, this.#idProp)) {
      const id = [
        this.name,
        Date.now().toString(36),
        Math.random().toString(36).slice(2),
      ].join(".");
      Object.defineProperty(this, this.#idProp, {
        configurable: false,
        enumerable: false,
        writable: false,
        get() {
          return id;
        },
      });
      return id;
    }
    return this[this.#idProp];
  }

  static idOf(component: unknown): string {
    if (!(component instanceof Component)) {
      if (
        !(
          component instanceof Function &&
          "cid" in component &&
          typeof component.cid === "string"
        )
      ) {
        throw new NotAComponentError();
      }
      return component.cid;
    }
    return (component.constructor as typeof Component).cid;
  }
}

import { lineage } from "../utils";
import { EventError } from "./errors/event";

export type MaestroEventPayload<T> = T extends MaestroEvent<infer P>
  ? P
  : never;

export abstract class MaestroEvent<T> extends CustomEvent<T> {
  static #keyProperty = "__maestroeventkey";

  static keyOf(): string;
  static keyOf<TEvent extends MaestroEvent<unknown>>(event: TEvent): string;
  static keyOf<
    TEvent extends MaestroEvent<unknown>,
    TEventClass extends { new (...args: any[]): TEvent }
  >(event: TEventClass): string;
  static keyOf(target: unknown = this): string {
    if (target instanceof MaestroEvent) {
      return this.keyOf(
        target.constructor as { new (...args: any[]): MaestroEvent<unknown> }
      );
    }
    if (!(target && Array.from(lineage(target)).includes(MaestroEvent))) {
      EventError.ThrowsNotAnEvent;
    }
    if (!Object.hasOwn(target as object, this.#keyProperty)) {
      const key = `maestro.event`;
      Object.defineProperty(target, this.#keyProperty, {
        configurable: false,
        enumerable: false,
        get() {
          return key;
        },
        set() {
          EventError.ThrowsNotAssignable;
        },
      });
      return key;
    }
    return target[this.#keyProperty];
  }

  constructor(detail: T) {
    super(MaestroEvent.keyOf(), { detail });
  }
}

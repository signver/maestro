import { Plugin } from "../core";

export class FormValidator extends Plugin {
  constructor(public readonly controller: Plugin) {
    super();
  }
}

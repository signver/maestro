import { Component } from "../component";
import type { IPlugin } from "./interface";
import type { OmitFirstElement } from "../../utils/types";
import { PluginEvent } from "./event";

export class Plugin extends Component implements IPlugin {
  #registry: Map<string, Component> = new Map();

  use<
    Module extends Component,
    ModuleCtor extends {
      new (...args: [IPlugin, ...any[]]): Module;
    }
  >(
    Module: ModuleCtor,
    ...args: OmitFirstElement<ConstructorParameters<ModuleCtor>>
  ): Plugin {
    const pluginModule = new Module(this, ...args);
    this.#registry.set(Component.idOf(pluginModule), pluginModule);
    this.dispatchEvent(new PluginEvent(PluginEvent.ON_MODULE_REGISTRATION));
    return this;
  }

  find<
    Module extends Component,
    ModuleCtor extends {
      new (...args: [IPlugin, ...any[]]): Module;
    }
  >(Module: ModuleCtor): InstanceType<ModuleCtor> | undefined {
    const id = Component.idOf(Module as unknown as typeof Component);
    return this.#registry.get((Module as unknown as typeof Component).cid) as
      | InstanceType<ModuleCtor>
      | undefined;
  }
}

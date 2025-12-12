import { Component } from "./component";
import { ModuleError } from "./errors/module";

export abstract class Module extends Component {
  host?: Module;

  children: Map<ReturnType<(typeof Component)["idOf"]>, Module> = new Map();

  attach<
    TModule extends Module,
    TModuleCtor extends { new (...args: any[]): TModule }
  >(Plugin: TModuleCtor, ...args: ConstructorParameters<TModuleCtor>): this {
    const plugin = new Plugin(...args);
    plugin.host = this;
    this.children.set(Component.idOf(Plugin), plugin);
    return this;
  }

  find<
    TModule extends Module,
    TModuleCtor extends { new (...args: any[]): TModule }
  >(Plugin: TModuleCtor): TModule {
    const plugin = this.children.get(Component.idOf(Plugin));
    if (!plugin) {
      ModuleError.ThrowsNotFound;
    }
    return plugin as TModule;
  }
}

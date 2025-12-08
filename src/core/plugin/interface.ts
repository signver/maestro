import type { Component } from "../component";

export interface IPlugin {
  find: {
    <
      Module extends Component,
      ModuleCtor extends {
        new (...args: [IPlugin, ...any[]]): Module;
      }
    >(
      Module: ModuleCtor
    ): InstanceType<ModuleCtor> | undefined;
  };
  
  use: {
    <
      Module extends Component,
      ModuleCtor extends { new (...args: [IPlugin, ...any[]]): Module }
    >(
      module: ModuleCtor,
      ...args: any[]
    ): IPlugin;
  };
}

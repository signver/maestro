export class PluginEvent<T> extends CustomEvent<T> {
  static ON_MODULE_REGISTRATION = "plugin:register";
}

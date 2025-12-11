export function* lineage(of: unknown): Generator<unknown> {
  if (!of) {
    yield undefined;
    return;
  }
  const proto = Object.getPrototypeOf(of);
  yield proto;
  yield* lineage(proto);
}

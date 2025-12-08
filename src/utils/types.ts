export type OmitFirstElement<T extends any[]> = T extends [
  infer First,
  ...infer Rest
]
  ? Rest
  : [];

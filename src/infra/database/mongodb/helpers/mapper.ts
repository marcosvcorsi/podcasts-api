export function map<T>(data: any): T {
  const { _id: id, ...rest } = data.toJSON();

  return {
    id,
    ...rest,
  };
}

export function mapCollection<T>(collection: any[]): T[] {
  return collection.map((item) => map<T>(item));
}

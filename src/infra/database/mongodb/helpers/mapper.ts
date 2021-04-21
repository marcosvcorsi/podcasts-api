export function map<T>(data: any): T {
  const { _id: id, ...collectionWithouId } = data;

  return {
    id,
    ...collectionWithouId,
  };
}

export function mapCollection<T>(collection: any[]): T[] {
  return collection.map((item) => map<T>(item));
}

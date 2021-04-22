import { map, mapCollection } from '@/infra/database/mongodb/helpers/mapper';

describe('MapperHelper Tests', () => {
  describe('map()', () => {
    it('should map mongo object to a entity', () => {
      const mongoObject = {
        toJSON: () => ({
          _id: 'anyid',
          name: 'anyname',
        }),
      };

      const result = map<any>(mongoObject);

      expect(result.id).toBe(mongoObject.toJSON()._id);
    });
  });

  describe('mapCollection()', () => {
    it('should map mongo collection to a entities', () => {
      const mongoObject = {
        toJSON: () => ({
          _id: 'anyid',
          name: 'anyname',
        }),
      };

      const result = mapCollection<any>([mongoObject]);

      expect(result[0].id).toBe(mongoObject.toJSON()._id);
    });
  });
});

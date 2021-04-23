import { validateRequiredParams } from '@/presentation/helpers/validation';

describe('ValidationHelper Tests', () => {
  describe('validateRequiredParams()', () => {
    it('should return is valid true when all parameters was passed', () => {
      const params = {
        name: 'anyname',
        lastName: 'anylastname',
      };

      const { isValid } = validateRequiredParams(params, ['name', 'lastName']);

      expect(isValid).toBeTruthy();
    });

    it('should return is valid false when miss parameters', () => {
      const params = {
        name: 'anyname',
      };

      const { isValid, errors } = validateRequiredParams(params, [
        'name',
        'lastName',
      ]);

      expect(isValid).toBeFalsy();
      expect(errors).toHaveLength(1);
      expect(errors).toEqual(['lastName is required']);
    });
  });
});

import { ManagerSchema } from '../manager/manager.schema';

describe('ManagerSchema', () => {
  it('should be defined', () => {
    expect(new ManagerSchema()).toBeDefined();
  });
});

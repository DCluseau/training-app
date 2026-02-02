import { TrainingModel } from './training-model.model';

describe('TrainingModel', () => {
  it('should create an instance', () => {
    expect(new TrainingModel(0, '', '', 0, 0)).toBeTruthy();
  });
});

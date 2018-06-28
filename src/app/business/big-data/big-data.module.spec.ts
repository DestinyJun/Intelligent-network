import { BigDataModule } from './big-data.module';

describe('BigDataModule', () => {
  let bigDataModule: BigDataModule;

  beforeEach(() => {
    bigDataModule = new BigDataModule();
  });

  it('should create an instance', () => {
    expect(bigDataModule).toBeTruthy();
  });
});

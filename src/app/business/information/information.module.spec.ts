import { InformationModule } from './information.module';

describe('InformationModule', () => {
  let informationModule: InformationModule;

  beforeEach(() => {
    informationModule = new InformationModule();
  });

  it('should create an instance', () => {
    expect(informationModule).toBeTruthy();
  });
});

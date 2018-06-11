import { TFCAdminPage } from './app.po';

describe('tfc-admin App', () => {
  let page: TFCAdminPage;

  beforeEach(() => {
    page = new TFCAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

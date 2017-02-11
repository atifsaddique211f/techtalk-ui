import { TechtalkUiPage } from './app.po';

describe('techtalk-ui App', function() {
  let page: TechtalkUiPage;

  beforeEach(() => {
    page = new TechtalkUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

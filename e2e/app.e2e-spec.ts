import { TranslateIT2Page } from './app.po';

describe('translate-it2 App', () => {
  let page: TranslateIT2Page;

  beforeEach(() => {
    page = new TranslateIT2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

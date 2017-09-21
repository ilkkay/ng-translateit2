import { browser, by, element } from 'protractor';
import { TranslateIT2Page } from './app.po';

describe('translate-it2 App', () => {
  let page: TranslateIT2Page;

  beforeEach(async () => {
    page = new TranslateIT2Page();
    await page.navigateTo('/');
  });

  it('should display welcome message', async () => {
    await browser.driver.findElements(by.css('h1'));
    expect(page.getParagraphText('app-root h1')).toEqual('Welcome to app!!');
  });

  it('should display Project link', async () => {
    await browser.driver.findElements(by.css('h1'));
    expect(page.getFirstParagraphText('app-root li a')).toEqual('Project');
  });

  it('should display Menu link', async () => {
    await browser.driver.findElements(by.css('h1'));
    expect(page.getLastParagraphText('app-root li a')).toEqual('Angular blog');
  });

    it('should navigate to project list when link clicked', async () => {
      await page.navigateTo('/');
      await element(by.id('projects')).click();

      expect(browser.getCurrentUrl()).toMatch('/projects');

      const elementText = await page.getFirstParagraphText(
        'app-project-list table thead tr th');
      expect(elementText).toEqual('NAME');
    });

    it('should navigate to work list when Next clicked', async () => {
      await page.navigateTo('/projects');
      await element(by.buttonText('Next')).click();
      expect(browser.getCurrentUrl()).toMatch('/works');
    });

    it('should show Translate IT 2 entity in project list', async () => {
      await page.navigateTo('/projects');
      const elementText = await page.getFirstParagraphText(
        'app-project-list table tbody tr td');
      expect(elementText).toEqual('Translate IT 2');
    });

    it('should rename and save Translate IT 2 entity', async () => {
      await page.navigateTo('/projects');
      await element.all(by.buttonText('Edit')).first().click();

      const appName = await element(by.id('appname'));

      await appName.sendKeys('2');
      browser.wait(element(by.buttonText('Save')).isEnabled);
      element(by.buttonText('Save')).click();
      let elementText = await page.getFirstParagraphText(
        'app-project-list table tbody tr td');
      expect(elementText).toEqual('Translate IT 22');

      await appName.clear();
      browser.wait(element(by.buttonText('Save')).isEnabled(), 1000);

      await appName.sendKeys('Translate IT 2');
      browser.wait(element(by.buttonText('Save')).isEnabled);
      element(by.buttonText('Save')).click();
      elementText = await page.getFirstParagraphText(
        'app-project-list table tbody tr td');
      expect(elementText).toEqual('Translate IT 2');

    });
// https://gist.github.com/javierarques/0c4c817d6c77b0877fda
    it('should show Translate IT 2 detail when Edit clicked', async () => {
      await page.navigateTo('/projects');
      await element.all(by.buttonText('Edit')).first().click();

      const appLabel = await page.getFirstParagraphText(
        'app-project-detail label');
      expect(appLabel).toEqual('Application name');

      // const pelement = await element(by.binding('project.name')).getText();
      // const pelement2 = await element(by.binding('projectForm.name')).getText();
      // const pelement3 = await element(by.binding('projectForm.controls.name')).getText();
      //   const pelement4 = element(by.css('formControlName')).getText();

      // elementText = await element.all(by.className('form-horizontal')).first().getText();

      // expect(elementText).toEqual('Translate IT 2');

      // browser.pause();
    });

});

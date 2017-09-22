import { browser, by, element } from 'protractor';
import { TranslateIT2Page } from './app.po';

describe('translate-it2 App', () => {
  let page: TranslateIT2Page;

  beforeEach(async () => {
    page = new TranslateIT2Page();
    page.navigateTo('/');
  });

  it('should display welcome message', async () => {
    await browser.driver.findElements(by.css('h1'));
    expect(await page.getParagraphText('app-root h1')).toEqual('Welcome to app!!');
  });

  it('should display Project link', async () => {
    await browser.driver.findElements(by.css('h1'));
    expect(await page.getFirstParagraphText('app-root li a')).toEqual('Project');
  });

  it('should display Menu link', async () => {
    await browser.driver.findElements(by.css('h1'));
    expect(await page.getLastParagraphText('app-root li a')).toEqual('Angular blog');
  });

  fit('should navigate to project list when Container link clicked', async () => {
    page.navigateTo('/');
    await element(by.id('projects')).click();

    expect(await browser.getCurrentUrl()).toMatch('/projects');

    const elementText = await page.getFirstParagraphText(
      'app-project-list table thead tr th');
    expect(elementText).toEqual('NAME');
  });

  fit('should navigate to work list when Next clicked', async () => {
    page.navigateTo('/projects;state=edit;id=1');
    expect(await browser.getCurrentUrl()).toMatch('/projects');

    await element(by.id('Next')).click();
    expect(await browser.getCurrentUrl()).toMatch('/works');
  });

  fit('should show Translate IT 2 entity in project list', async () => {
    page.navigateTo('/projects;state=edit;id=1');
    const elementText = await page.getFirstParagraphText(
      'app-project-list table tbody tr td');
    expect(elementText).toEqual('Translate IT 2');
  });

  // https://gist.github.com/javierarques/0c4c817d6c77b0877fda
  fit('should show Translate IT 2 detail when Edit clicked', async () => {
    page.navigateTo('/projects');
    // page.navigateTo('/projects;state=edit;id=1');
    await element.all(by.buttonText('Edit')).first().click();

    const appLabel = await page.getFirstParagraphText(
      'app-project-detail label');
    expect(appLabel).toEqual('Application name');

    let elementText = await element(by.id('appname')).getAttribute('value')
    expect(elementText).toEqual('Translate IT 2');
    elementText = await element(by.id('sourceLocale')).getAttribute('value')
    expect(elementText).toEqual('en_EN');
  });

  fit('should rename and save Translate IT 2 entity', async () => {
    page.navigateTo('/projects;state=edit;id=1');
    await element.all(by.buttonText('Edit')).first().click();

    const appName = await element(by.id('appname'));

    await appName.clear().sendKeys('Translate IT 22');
    browser.wait(element(by.buttonText('Save')).isEnabled);
    await element(by.buttonText('Save')).click();
    let elementText = await page.getFirstParagraphText(
      'app-project-list table tbody tr td');
    expect(elementText).toEqual('Translate IT 22');

    await appName.clear();
    browser.wait(element(by.buttonText('Save')).isEnabled(), 1000);

    await appName.sendKeys('Translate IT 2');
    await browser.wait(element(by.buttonText('Save')).isEnabled);
    await element(by.buttonText('Save')).click();
    elementText = await page.getFirstParagraphText(
      'app-project-list table tbody tr td');
    expect(elementText).toEqual('Translate IT 2');

  });

  fit('should delete a new, created entity when New, Save and Delete clicked', async () => {
    // await page.navigateTo('/projects');
    await page.navigateTo('/projects;state=edit;id=1');

    await browser.wait(element(by.buttonText('New')).isEnabled, 3000);
    await element.all(by.buttonText('New')).first().click();

    const appName = await element(by.id('appname'));
    await appName.clear();
    await appName.sendKeys('Translate IT 33');

    await browser.wait(element(by.buttonText('Save')).isEnabled, 3000);
    await element(by.buttonText('Save')).click();
    const elementText = await element.all(
      by.css('app-project-list table tbody tr')).count();
    expect(elementText).toBe(2);

    await element(by.buttonText('Delete')).click()
    /*
          const confirmDelete = await browser.wait(element(by.css('app-confirm-delete')).isDisplayed(), 5000);
          expect(await element(by.css('app-confirm-delete h2')).getText()).toBe('Delete project');
          await browser.wait(element(by.buttonText('Yes')).isEnabled, 1000);
          await element(by.buttonText('Yes')).click();
    */
    await browser.wait(element(by.css('app-project-list')).isDisplayed(), 5000);
    const rowCount = await element.all(
      by.css('app-project-list table tbody tr')).count();
    expect(rowCount).toBe(1);

    const detail = await element(by.css('app-detail-list'));
    expect(browser.isElementPresent(detail)).toBe(false);
  });

  fit('should show detail when empty Project list', async () => {
    page.navigateTo('/projects');
    // await page.navigateTo('/projects;state=edit;id=1');

    await element.all(by.buttonText('Edit')).first().click();

    await browser.wait(element(by.buttonText('Delete')).isEnabled, 3000);
    await element(by.buttonText('Delete')).click()
    await browser.wait(element(by.css('app-project-list')).isDisplayed(), 3000);
    let rowCount = await element.all(
      by.css('app-project-list table tbody tr')).count();
    expect(rowCount).toBe(0);

    const detail = await element(by.css('app-project-detail'));
    expect(browser.isElementPresent(detail)).toBe(true);

    // add a new Entity
    await element(by.buttonText('New')).click();

    const appName = await element(by.id('appname'));
    await appName.clear().sendKeys('Translate IT 2');

    await browser.wait(element(by.buttonText('Save')).isEnabled, 3000);
    await element(by.buttonText('Save')).click();
    rowCount = await element.all(
      by.css('app-project-list table tbody tr')).count();
    expect(rowCount).toBe(1);
  });

  fit('should show error message when invalid project id', async () => {
    await page.navigateTo('/projects;state=edit;id=666');

    const errorMessage = await element(by.css('app-error-message'));
    await browser.wait(errorMessage.isDisplayed(), 3000);
    expect(browser.isElementPresent(errorMessage)).toBe(true);
  });

  xit('should clear error message after valid operation', async () => {
    await page.navigateTo('/projects;state=edit;id=666');

    const errorMessage = await element(by.css('app-error-message'));
    await browser.wait(errorMessage.isDisplayed(), 3000);
    expect(browser.isElementPresent(errorMessage)).toBe(true);
  });

  fit('should show error message when save project with existing name', async () => {
    await page.navigateTo('/projects;state=edit;id=1');

    await browser.wait(element(by.buttonText('New')).isEnabled, 3000);
    await element(by.buttonText('New')).click();

    const appName = await element(by.id('appname'));
    await appName.clear().sendKeys('Translate IT 2');

    await browser.wait(element(by.buttonText('Save')).isEnabled, 3100);
    await element(by.buttonText('Save')).click();

    const errorMessage = await element(by.css('app-error-message'));
    await browser.wait(errorMessage.isDisplayed(), 3200);
    expect(browser.isElementPresent(errorMessage)).toBe(true);

  });
});

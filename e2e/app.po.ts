import { browser, by, element } from 'protractor';

// https://code.tutsplus.com/tutorials/getting-started-with-end-to-end-testing-in-angular-using-protractor--cms-29318

export class TranslateIT2Page {
  navigateTo(path: string) {
    return browser.get(path);
  }

  getParagraphText(directive: string) {
    return element(by.css(directive)).getText();
  }

  getFirstParagraphText(directive: string) {
    return element.all(by.css(directive)).first().getText();
  }

  getLastParagraphText(directive: string) {
    return element.all(by.css(directive)).last().getText();
  }
}

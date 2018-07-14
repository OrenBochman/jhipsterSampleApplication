import { element, by, promise, ElementFinder } from 'protractor';

export class CompanyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-company-my-suffix div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class CompanyUpdatePage {
    pageTitle = element(by.id('jhi-company-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    companyNameInput = element(by.id('field_companyName'));
    companySelect = element(by.id('field_company'));
    companySelect = element(by.id('field_company'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setCompanyNameInput(companyName): promise.Promise<void> {
        return this.companyNameInput.sendKeys(companyName);
    }

    getCompanyNameInput() {
        return this.companyNameInput.getAttribute('value');
    }

    companySelectLastOption(): promise.Promise<void> {
        return this.companySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    companySelectOption(option): promise.Promise<void> {
        return this.companySelect.sendKeys(option);
    }

    getCompanySelect(): ElementFinder {
        return this.companySelect;
    }

    getCompanySelectedOption() {
        return this.companySelect.element(by.css('option:checked')).getText();
    }

    companySelectLastOption(): promise.Promise<void> {
        return this.companySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    companySelectOption(option): promise.Promise<void> {
        return this.companySelect.sendKeys(option);
    }

    getCompanySelect(): ElementFinder {
        return this.companySelect;
    }

    getCompanySelectedOption() {
        return this.companySelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

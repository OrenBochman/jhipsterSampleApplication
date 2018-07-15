import { element, by, promise, ElementFinder } from 'protractor';

export class CustomerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-customer-my-suffix div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class CustomerUpdatePage {
    pageTitle = element(by.id('jhi-customer-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    customerNameInput = element(by.id('field_customerName'));
    userSelect = element(by.id('field_user'));
    customerSelect = element(by.id('field_customer'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setCustomerNameInput(customerName): promise.Promise<void> {
        return this.customerNameInput.sendKeys(customerName);
    }

    getCustomerNameInput() {
        return this.customerNameInput.getAttribute('value');
    }

    userSelectLastOption(): promise.Promise<void> {
        return this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    userSelectOption(option): promise.Promise<void> {
        return this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    customerSelectLastOption(): promise.Promise<void> {
        return this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    customerSelectOption(option): promise.Promise<void> {
        return this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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

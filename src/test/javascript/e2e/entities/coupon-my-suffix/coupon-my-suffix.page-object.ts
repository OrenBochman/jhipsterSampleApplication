import { element, by, promise, ElementFinder } from 'protractor';

export class CouponComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-coupon-my-suffix div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class CouponUpdatePage {
    pageTitle = element(by.id('jhi-coupon-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    startInput = element(by.id('field_start'));
    endInput = element(by.id('field_end'));
    amountInput = element(by.id('field_amount'));
    couponTypeInput = element(by.id('field_couponType'));
    messageInput = element(by.id('field_message'));
    priceInput = element(by.id('field_price'));
    imageInput = element(by.id('field_image'));
    companySelect = element(by.id('field_company'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setTitleInput(title): promise.Promise<void> {
        return this.titleInput.sendKeys(title);
    }

    getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    setStartInput(start): promise.Promise<void> {
        return this.startInput.sendKeys(start);
    }

    getStartInput() {
        return this.startInput.getAttribute('value');
    }

    setEndInput(end): promise.Promise<void> {
        return this.endInput.sendKeys(end);
    }

    getEndInput() {
        return this.endInput.getAttribute('value');
    }

    setAmountInput(amount): promise.Promise<void> {
        return this.amountInput.sendKeys(amount);
    }

    getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    setCouponTypeInput(couponType): promise.Promise<void> {
        return this.couponTypeInput.sendKeys(couponType);
    }

    getCouponTypeInput() {
        return this.couponTypeInput.getAttribute('value');
    }

    setMessageInput(message): promise.Promise<void> {
        return this.messageInput.sendKeys(message);
    }

    getMessageInput() {
        return this.messageInput.getAttribute('value');
    }

    setPriceInput(price): promise.Promise<void> {
        return this.priceInput.sendKeys(price);
    }

    getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    setImageInput(image): promise.Promise<void> {
        return this.imageInput.sendKeys(image);
    }

    getImageInput() {
        return this.imageInput.getAttribute('value');
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

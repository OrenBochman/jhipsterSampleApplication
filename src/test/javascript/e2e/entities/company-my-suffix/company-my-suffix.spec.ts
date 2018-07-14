import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CompanyComponentsPage, CompanyUpdatePage } from './company-my-suffix.page-object';

describe('Company e2e test', () => {
    let navBarPage: NavBarPage;
    let companyUpdatePage: CompanyUpdatePage;
    let companyComponentsPage: CompanyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Companies', () => {
        navBarPage.goToEntity('company-my-suffix');
        companyComponentsPage = new CompanyComponentsPage();
        expect(companyComponentsPage.getTitle()).toMatch(/Companies/);
    });

    it('should load create Company page', () => {
        companyComponentsPage.clickOnCreateButton();
        companyUpdatePage = new CompanyUpdatePage();
        expect(companyUpdatePage.getPageTitle()).toMatch(/Create or edit a Company/);
        companyUpdatePage.cancel();
    });

    it('should create and save Companies', () => {
        companyComponentsPage.clickOnCreateButton();
        companyUpdatePage.setCompanyNameInput('companyName');
        expect(companyUpdatePage.getCompanyNameInput()).toMatch('companyName');
        companyUpdatePage.companySelectLastOption();
        companyUpdatePage.companySelectLastOption();
        companyUpdatePage.save();
        expect(companyUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

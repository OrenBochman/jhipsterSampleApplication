import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CouponComponentsPage, CouponUpdatePage } from './coupon-my-suffix.page-object';

describe('Coupon e2e test', () => {
    let navBarPage: NavBarPage;
    let couponUpdatePage: CouponUpdatePage;
    let couponComponentsPage: CouponComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Coupons', () => {
        navBarPage.goToEntity('coupon-my-suffix');
        couponComponentsPage = new CouponComponentsPage();
        expect(couponComponentsPage.getTitle()).toMatch(/Coupons/);
    });

    it('should load create Coupon page', () => {
        couponComponentsPage.clickOnCreateButton();
        couponUpdatePage = new CouponUpdatePage();
        expect(couponUpdatePage.getPageTitle()).toMatch(/Create or edit a Coupon/);
        couponUpdatePage.cancel();
    });

    it('should create and save Coupons', () => {
        couponComponentsPage.clickOnCreateButton();
        couponUpdatePage.setTitleInput('title');
        expect(couponUpdatePage.getTitleInput()).toMatch('title');
        couponUpdatePage.setStartInput('5');
        expect(couponUpdatePage.getStartInput()).toMatch('5');
        couponUpdatePage.setEndInput('5');
        expect(couponUpdatePage.getEndInput()).toMatch('5');
        couponUpdatePage.setAmountInput('5');
        expect(couponUpdatePage.getAmountInput()).toMatch('5');
        couponUpdatePage.setCouponTypeInput('couponType');
        expect(couponUpdatePage.getCouponTypeInput()).toMatch('couponType');
        couponUpdatePage.setMessageInput('message');
        expect(couponUpdatePage.getMessageInput()).toMatch('message');
        couponUpdatePage.setPriceInput('5');
        expect(couponUpdatePage.getPriceInput()).toMatch('5');
        couponUpdatePage.setImageInput('image');
        expect(couponUpdatePage.getImageInput()).toMatch('image');
        couponUpdatePage.companySelectLastOption();
        couponUpdatePage.save();
        expect(couponUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

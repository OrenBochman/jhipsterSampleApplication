import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    CouponMySuffixComponent,
    CouponMySuffixDetailComponent,
    CouponMySuffixUpdateComponent,
    CouponMySuffixDeletePopupComponent,
    CouponMySuffixDeleteDialogComponent,
    couponRoute,
    couponPopupRoute
} from './';

const ENTITY_STATES = [...couponRoute, ...couponPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CouponMySuffixComponent,
        CouponMySuffixDetailComponent,
        CouponMySuffixUpdateComponent,
        CouponMySuffixDeleteDialogComponent,
        CouponMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CouponMySuffixComponent,
        CouponMySuffixUpdateComponent,
        CouponMySuffixDeleteDialogComponent,
        CouponMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationCouponMySuffixModule {}

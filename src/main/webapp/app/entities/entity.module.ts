import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationCompanyMySuffixModule } from './company-my-suffix/company-my-suffix.module';
import { JhipsterSampleApplicationCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { JhipsterSampleApplicationCouponMySuffixModule } from './coupon-my-suffix/coupon-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipsterSampleApplicationCompanyMySuffixModule,
        JhipsterSampleApplicationCustomerMySuffixModule,
        JhipsterSampleApplicationCouponMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}

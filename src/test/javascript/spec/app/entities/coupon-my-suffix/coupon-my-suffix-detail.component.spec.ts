/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CouponMySuffixDetailComponent } from 'app/entities/coupon-my-suffix/coupon-my-suffix-detail.component';
import { CouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';

describe('Component Tests', () => {
    describe('CouponMySuffix Management Detail Component', () => {
        let comp: CouponMySuffixDetailComponent;
        let fixture: ComponentFixture<CouponMySuffixDetailComponent>;
        const route = ({ data: of({ coupon: new CouponMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [CouponMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CouponMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CouponMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.coupon).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

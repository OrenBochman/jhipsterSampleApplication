/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CouponMySuffixUpdateComponent } from 'app/entities/coupon-my-suffix/coupon-my-suffix-update.component';
import { CouponMySuffixService } from 'app/entities/coupon-my-suffix/coupon-my-suffix.service';
import { CouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';

describe('Component Tests', () => {
    describe('CouponMySuffix Management Update Component', () => {
        let comp: CouponMySuffixUpdateComponent;
        let fixture: ComponentFixture<CouponMySuffixUpdateComponent>;
        let service: CouponMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [CouponMySuffixUpdateComponent]
            })
                .overrideTemplate(CouponMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CouponMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CouponMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CouponMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.coupon = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CouponMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.coupon = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';
import { CouponMySuffixService } from './coupon-my-suffix.service';
import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';
import { CompanyMySuffixService } from 'app/entities/company-my-suffix';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';

@Component({
    selector: 'jhi-coupon-my-suffix-update',
    templateUrl: './coupon-my-suffix-update.component.html'
})
export class CouponMySuffixUpdateComponent implements OnInit {
    private _coupon: ICouponMySuffix;
    isSaving: boolean;

    companies: ICompanyMySuffix[];

    customers: ICustomerMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private couponService: CouponMySuffixService,
        private companyService: CompanyMySuffixService,
        private customerService: CustomerMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ coupon }) => {
            this.coupon = coupon;
        });
        this.companyService.query({ filter: 'coupon-is-null' }).subscribe(
            (res: HttpResponse<ICompanyMySuffix[]>) => {
                if (!this.coupon.companyId) {
                    this.companies = res.body;
                } else {
                    this.companyService.find(this.coupon.companyId).subscribe(
                        (subRes: HttpResponse<ICompanyMySuffix>) => {
                            this.companies = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomerMySuffix[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.coupon.id !== undefined) {
            this.subscribeToSaveResponse(this.couponService.update(this.coupon));
        } else {
            this.subscribeToSaveResponse(this.couponService.create(this.coupon));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICouponMySuffix>>) {
        result.subscribe((res: HttpResponse<ICouponMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompanyById(index: number, item: ICompanyMySuffix) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomerMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get coupon() {
        return this._coupon;
    }

    set coupon(coupon: ICouponMySuffix) {
        this._coupon = coupon;
    }
}

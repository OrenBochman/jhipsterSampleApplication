import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';
import { CouponMySuffixService } from './coupon-my-suffix.service';

@Component({
    selector: 'jhi-coupon-my-suffix-update',
    templateUrl: './coupon-my-suffix-update.component.html'
})
export class CouponMySuffixUpdateComponent implements OnInit {
    private _coupon: ICouponMySuffix;
    isSaving: boolean;

    constructor(private couponService: CouponMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ coupon }) => {
            this.coupon = coupon;
        });
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
    get coupon() {
        return this._coupon;
    }

    set coupon(coupon: ICouponMySuffix) {
        this._coupon = coupon;
    }
}

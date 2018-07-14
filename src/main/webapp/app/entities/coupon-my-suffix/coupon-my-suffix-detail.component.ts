import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';

@Component({
    selector: 'jhi-coupon-my-suffix-detail',
    templateUrl: './coupon-my-suffix-detail.component.html'
})
export class CouponMySuffixDetailComponent implements OnInit {
    coupon: ICouponMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coupon }) => {
            this.coupon = coupon;
        });
    }

    previousState() {
        window.history.back();
    }
}

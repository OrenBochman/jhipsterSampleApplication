import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';
import { CouponMySuffixService } from './coupon-my-suffix.service';
import { CouponMySuffixComponent } from './coupon-my-suffix.component';
import { CouponMySuffixDetailComponent } from './coupon-my-suffix-detail.component';
import { CouponMySuffixUpdateComponent } from './coupon-my-suffix-update.component';
import { CouponMySuffixDeletePopupComponent } from './coupon-my-suffix-delete-dialog.component';
import { ICouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CouponMySuffixResolve implements Resolve<ICouponMySuffix> {
    constructor(private service: CouponMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((coupon: HttpResponse<CouponMySuffix>) => coupon.body));
        }
        return of(new CouponMySuffix());
    }
}

export const couponRoute: Routes = [
    {
        path: 'coupon-my-suffix',
        component: CouponMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coupons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'coupon-my-suffix/:id/view',
        component: CouponMySuffixDetailComponent,
        resolve: {
            coupon: CouponMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coupons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'coupon-my-suffix/new',
        component: CouponMySuffixUpdateComponent,
        resolve: {
            coupon: CouponMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coupons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'coupon-my-suffix/:id/edit',
        component: CouponMySuffixUpdateComponent,
        resolve: {
            coupon: CouponMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coupons'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const couponPopupRoute: Routes = [
    {
        path: 'coupon-my-suffix/:id/delete',
        component: CouponMySuffixDeletePopupComponent,
        resolve: {
            coupon: CouponMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Coupons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

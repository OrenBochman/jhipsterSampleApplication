import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';
import { CouponMySuffixService } from './coupon-my-suffix.service';

@Component({
    selector: 'jhi-coupon-my-suffix-delete-dialog',
    templateUrl: './coupon-my-suffix-delete-dialog.component.html'
})
export class CouponMySuffixDeleteDialogComponent {
    coupon: ICouponMySuffix;

    constructor(private couponService: CouponMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.couponService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'couponListModification',
                content: 'Deleted an coupon'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-coupon-my-suffix-delete-popup',
    template: ''
})
export class CouponMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ coupon }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CouponMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.coupon = coupon;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

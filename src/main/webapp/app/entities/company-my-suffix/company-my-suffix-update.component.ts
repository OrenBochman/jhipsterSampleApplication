import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';
import { CompanyMySuffixService } from './company-my-suffix.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-company-my-suffix-update',
    templateUrl: './company-my-suffix-update.component.html'
})
export class CompanyMySuffixUpdateComponent implements OnInit {
    private _company: ICompanyMySuffix;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private companyService: CompanyMySuffixService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyMySuffix>>) {
        result.subscribe((res: HttpResponse<ICompanyMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get company() {
        return this._company;
    }

    set company(company: ICompanyMySuffix) {
        this._company = company;
    }
}

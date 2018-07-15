import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICouponMySuffix } from 'app/shared/model/coupon-my-suffix.model';

type EntityResponseType = HttpResponse<ICouponMySuffix>;
type EntityArrayResponseType = HttpResponse<ICouponMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CouponMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/coupons';

    constructor(private http: HttpClient) {}

    create(coupon: ICouponMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICouponMySuffix>(this.resourceUrl, coupon, { observe: 'response' });
    }

    update(coupon: ICouponMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICouponMySuffix>(this.resourceUrl, coupon, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICouponMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICouponMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

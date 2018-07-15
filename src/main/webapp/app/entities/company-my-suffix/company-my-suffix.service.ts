import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';

type EntityResponseType = HttpResponse<ICompanyMySuffix>;
type EntityArrayResponseType = HttpResponse<ICompanyMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CompanyMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/companies';

    constructor(private http: HttpClient) {}

    create(company: ICompanyMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICompanyMySuffix>(this.resourceUrl, company, { observe: 'response' });
    }

    update(company: ICompanyMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICompanyMySuffix>(this.resourceUrl, company, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

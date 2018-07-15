export interface ICompanyMySuffix {
    id?: number;
    companyName?: string;
    userLogin?: string;
    userId?: number;
}

export class CompanyMySuffix implements ICompanyMySuffix {
    constructor(public id?: number, public companyName?: string, public userLogin?: string, public userId?: number) {}
}

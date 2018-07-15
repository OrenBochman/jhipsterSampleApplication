import { ICustomerMySuffix } from 'app/shared/model//customer-my-suffix.model';

export interface ICouponMySuffix {
    id?: number;
    title?: string;
    start?: number;
    end?: number;
    amount?: number;
    couponType?: string;
    message?: string;
    price?: number;
    image?: string;
    companyId?: number;
    customers?: ICustomerMySuffix[];
}

export class CouponMySuffix implements ICouponMySuffix {
    constructor(
        public id?: number,
        public title?: string,
        public start?: number,
        public end?: number,
        public amount?: number,
        public couponType?: string,
        public message?: string,
        public price?: number,
        public image?: string,
        public companyId?: number,
        public customers?: ICustomerMySuffix[]
    ) {}
}

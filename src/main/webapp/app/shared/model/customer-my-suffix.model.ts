import { ICouponMySuffix } from 'app/shared/model//coupon-my-suffix.model';

export interface ICustomerMySuffix {
    id?: number;
    customerName?: string;
    userLogin?: string;
    userId?: number;
    customers?: ICouponMySuffix[];
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(
        public id?: number,
        public customerName?: string,
        public userLogin?: string,
        public userId?: number,
        public customers?: ICouponMySuffix[]
    ) {}
}

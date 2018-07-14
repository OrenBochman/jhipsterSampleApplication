import { ICouponMySuffix } from 'app/shared/model//coupon-my-suffix.model';

export interface ICustomerMySuffix {
    id?: number;
    customerName?: string;
    customerId?: number;
    customers?: ICouponMySuffix[];
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(public id?: number, public customerName?: string, public customerId?: number, public customers?: ICouponMySuffix[]) {}
}

export interface ICustomerMySuffix {
    id?: number;
    customerName?: string;
    customerId?: number;
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(public id?: number, public customerName?: string, public customerId?: number) {}
}

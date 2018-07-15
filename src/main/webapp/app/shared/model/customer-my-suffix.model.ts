export interface ICustomerMySuffix {
    id?: number;
    customerName?: string;
    userLogin?: string;
    userId?: number;
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(public id?: number, public customerName?: string, public userLogin?: string, public userId?: number) {}
}

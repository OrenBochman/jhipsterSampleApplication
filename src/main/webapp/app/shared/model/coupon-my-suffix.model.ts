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
        public image?: string
    ) {}
}

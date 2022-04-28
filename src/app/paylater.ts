export interface paylaterDetail{
    id:String;
    productName:String;
    totalInstallment:Int16Array;
    currentInstallment:Int16Array;
    price:DoubleRange;
    quantity:BigInteger;
    installmentPay:DoubleRange;
    status:String;
    dueDate:Date;
}
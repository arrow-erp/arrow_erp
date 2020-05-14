export interface OrderInterface {
  id?: string;
  studentId: string;
  totalFee: string;
  discount: string;
  tax: string;
  billAmount: number;
  createdOn?: any;
}

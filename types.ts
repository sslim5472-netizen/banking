export enum AccountType {
  PERSONAL = 'Personal',
  BUSINESS = 'Business'
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  accountType: AccountType;
}

export interface LoanCalculation {
  principal: number;
  rate: number;
  years: number;
  monthlyPayment: number;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface CreditCardProduct {
  name: string;
  apr: string;
  annualFee: string;
  rewards: string[];
  imageColor: string;
  category: 'cash' | 'travel' | 'business';
}

export interface Transaction {
  id: string;
  date: string;
  desc: string;
  category: string;
  amount: string;
  positive?: boolean;
  merchant: string;
  status: 'Completed' | 'Pending' | 'Failed';
  referenceNumber: string;
  paymentMethod: string;
  location?: string;
  time: string;
}
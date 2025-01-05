export interface Company {
  id: number;
  name: string;
  registrationCode: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  ownerId: number;
  logoUrl: string | null;
  category: string;
  workingHours: {
    dayOfWeek: string;
    openTime: string | null;
    closeTime: string | null;
  }[];
  active: boolean;
  submissionCancelled: boolean;
}

export enum Category {
  ALL = 'ALL',
  BEAUTY = 'BEAUTY',
  HEALTH = 'HEALTH',
  FITNESS = 'FITNESS',
  OTHER = 'OTHER',
}

export interface CompanyCategorySearch {
  id: Category;
  label: string;
}

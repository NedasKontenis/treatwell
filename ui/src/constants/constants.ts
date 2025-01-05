import { Category } from '../types/company';

export const PRS_AUTH_TOKEN = 'top_secret_prs_auth';

export const ENDPOINT = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  TOKEN_AUTH: '/auth/token',
  COMPANIES: '/companies',
  COMPANIES_BY_OWNER: '/companies/owner/',
};

export const SERVICE_CATEGORIES = [
  'BEAUTY',
  'HEALTH',
  'FITNESS',
  'OTHER',
] as const;

export const SERVICE_CATEGORIES_SEARCH_OPTIONS: {
  id: Category;
  label: string;
}[] = [
  { id: Category.ALL, label: 'All' },
  { id: Category.BEAUTY, label: 'Beauty' },
  { id: Category.HEALTH, label: 'Health' },
  { id: Category.FITNESS, label: 'Fitness' },
  { id: Category.OTHER, label: 'Other' },
];

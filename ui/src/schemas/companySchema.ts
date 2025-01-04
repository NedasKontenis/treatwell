import { z } from 'zod';

const timeValidation = (data: { open: Date | null; close: Date | null }) => {
  if (!data.open || !data.close) return true;
  return new Date(data.close) > new Date(data.open);
};

const workingHoursSchema = z
  .object({
    open: z.date().nullable(),
    close: z.date().nullable(),
  })
  .refine(timeValidation, {
    message: 'Close time must be after open time',
  });

export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(100),
  registrationCode: z
    .string()
    .min(1, 'Registration code is required')
    .regex(/^[0-9]{9}$/, 'Registration code must be 9 digits'),
  description: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+370\d{8}$/, 'Phone number must be in format: +370xxxxxxxx'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  category: z.enum(['BEAUTY', 'HEALTH', 'FITNESS', 'OTHER']),
  logoUrl: z.string().url().optional().or(z.literal('')),
  workingHours: z.object({
    monday: workingHoursSchema,
    tuesday: workingHoursSchema,
    wednesday: workingHoursSchema,
    thursday: workingHoursSchema,
    friday: workingHoursSchema,
    saturday: workingHoursSchema,
    sunday: workingHoursSchema,
  }),
});

export type CompanyFormData = z.infer<typeof companySchema>;

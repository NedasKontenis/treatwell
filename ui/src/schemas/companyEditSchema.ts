import { z } from 'zod';

const workingHoursSchema = z
  .object({
    dayOfWeek: z.string(),
    openTime: z.string().nullable(),
    closeTime: z.string().nullable(),
  })
  .refine(
    (data) => {
      if (data.openTime && data.closeTime) {
        return data.openTime < data.closeTime;
      }
      return true;
    },
    {
      message: 'Close time must be after open time',
    }
  );

export const companyEditSchema = z.object({
  id: z.number(),
  description: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+370\d{8}$/, 'Phone number must be in format: +370xxxxxxxx'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  category: z.enum(['BEAUTY', 'HEALTH', 'FITNESS', 'OTHER']),
  workingHours: z.array(workingHoursSchema),
});

export type CompanyEditFormData = z.infer<typeof companyEditSchema>;

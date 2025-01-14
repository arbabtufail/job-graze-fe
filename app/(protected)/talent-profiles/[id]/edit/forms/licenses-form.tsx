'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Award,
  MapPin,
  Globe,
  FileText,
  Calendar,
  CheckSquare,
} from 'lucide-react';
import { FormHeader } from '@/components/form-header';
import { ProfessionalLicense } from '@/shared/types/professionalLicense';

const licensesSchema = z.object({
  licenseType: z.string().min(1, 'License type is required'),
  licenseState: z.string().min(1, 'License state is required'),
  licenseCountry: z.string().min(1, 'License country is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  licenseEffectiveDate: z.string().min(1, 'License effective date is required'),
  licenseExpirationDate: z
    .string()
    .min(1, 'License expiration date is required'),
  nclexRn: z.string().min(1, 'NCLEX-RN status is required'),
  euRn: z.string().min(1, 'EU-RN status is required'),
  languageExam: z.string().min(1, 'Language exam is required'),
});

type LicensesFormData = z.infer<typeof licensesSchema>;

interface LicensesFormProps {
  data: ProfessionalLicense;
  onUpdate: (data: any) => void;
  closeForm: () => void;
  loading: boolean;
}

export function LicensesForm({
  data,
  onUpdate,
  closeForm,
  loading,
}: LicensesFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LicensesFormData>({
    resolver: zodResolver(licensesSchema),
    defaultValues: {
      licenseType: data.licenseType || '',
      licenseState: data.licenseState || '',
      licenseCountry: data.licenseCountry || '',
      licenseNumber: data.licenseNumber || '',
      licenseEffectiveDate:
        new Date(data.licenseEffectiveDate).toISOString().split('T')[0] || '',
      licenseExpirationDate:
        new Date(data.licenseExpirationDate).toISOString().split('T')[0] || '',
      nclexRn: data.nclexRn || '',
      euRn: data.euRn || '',
      languageExam: data.languageExam || '',
    },
  });

  const onSubmit = (formData: LicensesFormData) => {
    onUpdate({
      ...formData,
      licenseEffectiveDate: new Date(
        formData.licenseEffectiveDate
      ).toISOString(),
      licenseExpirationDate: new Date(
        formData.licenseExpirationDate
      ).toISOString(),
      licenseIssuedBy: data.licenseIssuedBy,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-8'
    >
      <FormHeader
        icon={Award}
        title='Licenses & Certifications'
        color='text-orange-600'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='licenseType'>License Type *</Label>
          <Controller
            name='licenseType'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <Award className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Input id='licenseType' className='pl-10' {...field} />
              </div>
            )}
          />
          {errors.licenseType && (
            <p className='text-red-500 text-sm'>{errors.licenseType.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='licenseState'>License State *</Label>
          <Controller
            name='licenseState'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Input id='licenseState' className='pl-10' {...field} />
              </div>
            )}
          />
          {errors.licenseState && (
            <p className='text-red-500 text-sm'>
              {errors.licenseState.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='licenseCountry'>License Country *</Label>
          <Controller
            name='licenseCountry'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Input id='licenseCountry' className='pl-10' {...field} />
              </div>
            )}
          />
          {errors.licenseCountry && (
            <p className='text-red-500 text-sm'>
              {errors.licenseCountry.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='licenseNumber'>License Number *</Label>
          <Controller
            name='licenseNumber'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <FileText className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Input id='licenseNumber' className='pl-10' {...field} />
              </div>
            )}
          />
          {errors.licenseNumber && (
            <p className='text-red-500 text-sm'>
              {errors.licenseNumber.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='licenseEffectiveDate'>License Effective Date *</Label>
          <Controller
            name='licenseEffectiveDate'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Input
                  type='date'
                  id='licenseEffectiveDate'
                  className='pl-10'
                  {...field}
                />
              </div>
            )}
          />
          {errors.licenseEffectiveDate && (
            <p className='text-red-500 text-sm'>
              {errors.licenseEffectiveDate.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='licenseExpirationDate'>
            License Expiration Date *
          </Label>
          <Controller
            name='licenseExpirationDate'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Input
                  type='date'
                  id='licenseExpirationDate'
                  className='pl-10'
                  {...field}
                />
              </div>
            )}
          />
          {errors.licenseExpirationDate && (
            <p className='text-red-500 text-sm'>
              {errors.licenseExpirationDate.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='nclexRn'>NCLEX-RN Status *</Label>
          <Controller
            name='nclexRn'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <CheckSquare className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id='nclexRn' className='pl-10'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Preparing'>Preparing</SelectItem>
                    <SelectItem value='Passed'>Passed</SelectItem>
                    <SelectItem value='Scheduled'>Scheduled</SelectItem>
                    <SelectItem value='N/A'>N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          {errors.nclexRn && (
            <p className='text-red-500 text-sm'>{errors.nclexRn.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='euRn'>EU-RN Status *</Label>
          <Controller
            name='euRn'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <CheckSquare className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id='euRn' className='pl-10'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Preparing'>Preparing</SelectItem>
                    <SelectItem value='Passed'>Passed</SelectItem>
                    <SelectItem value='Scheduled'>Scheduled</SelectItem>
                    <SelectItem value='N/A'>N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          {errors.euRn && (
            <p className='text-red-500 text-sm'>{errors.euRn.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='languageExam'>Language Exam *</Label>
          <Controller
            name='languageExam'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id='languageExam' className='pl-10'>
                    <SelectValue placeholder='Select language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='English'>English</SelectItem>
                    <SelectItem value='Spanish'>Spanish</SelectItem>
                    <SelectItem value='French'>French</SelectItem>
                    <SelectItem value='German'>German</SelectItem>
                    <SelectItem value='Other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          {errors.languageExam && (
            <p className='text-red-500 text-sm'>
              {errors.languageExam.message}
            </p>
          )}
        </div>
      </div>

      <div className='flex justify-end space-x-4'>
        <Button
          type='button'
          variant='outline'
          onClick={closeForm}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          className='bg-orange-600 text-white'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Save Changes'}
        </Button>
      </div>
    </motion.form>
  );
}

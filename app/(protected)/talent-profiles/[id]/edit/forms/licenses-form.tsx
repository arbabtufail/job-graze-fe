'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
  license: z.array(
    z.object({
      licenseType: z.string().min(1, 'License type is required'),
      licenseState: z.string().min(1, 'License state is required'),
      licenseCountry: z.string().min(1, 'License country is required'),
      licenseNumber: z.string().min(1, 'License number is required'),
      licenseEffectiveDate: z
        .string()
        .min(1, 'License effective date is required'),
      licenseExpirationDate: z
        .string()
        .min(1, 'License expiration date is required'),
    })
  ),
  nclexRn: z.string().min(1, 'NCLEX-RN status is required'),
  euRn: z.string().min(1, 'EU-RN status is required'),
  englishLanguageExam: z.string().min(1, 'English Language exam is required'),
  spanishLanguageExam: z.string().min(1, 'Spanish Language exam is required'),
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
      license: [
        {
          licenseType: data.licenseType || '',
          licenseState: data.licenseState || '',
          licenseCountry: data.licenseCountry || '',
          licenseNumber: data.licenseNumber || '',
          licenseEffectiveDate:
            new Date(data.licenseEffectiveDate).toISOString().split('T')[0] ||
            '',
          licenseExpirationDate:
            new Date(data.licenseExpirationDate).toISOString().split('T')[0] ||
            '',
        },
      ],
      nclexRn: data.nclexRn || '',
      euRn: data.euRn || '',
      englishLanguageExam: 'no',
      spanishLanguageExam: 'yes',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'license',
  });

  const onSubmit = (formData: LicensesFormData) => {
    onUpdate({
      ...formData,
      licenseType: formData.license[0].licenseType,
      licenseState: formData.license[0].licenseState,
      licenseCountry: formData.license[0].licenseCountry,
      licenseNumber: formData.license[0].licenseNumber,

      licenseEffectiveDate: new Date(
        formData.license[0].licenseEffectiveDate
      ).toISOString(),
      licenseExpirationDate: new Date(
        formData.license[0].licenseExpirationDate
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
      <div className='space-y-4'>
        <Label className='text-xl'>License</Label>
        {fields.map((field: any, index: number) => (
          <div key={field.id} className='space-y-4 p-4 border rounded-md '>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='licenseType'>License Type *</Label>
                <Controller
                  name={`license.${index}.licenseType`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <Award className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseType' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.license?.[index]?.licenseType && (
                  <p className='text-red-500 text-sm'>
                    {errors?.license[index]?.licenseType.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseState'>License State *</Label>
                <Controller
                  name={`license.${index}.licenseState`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseState' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.license?.[index]?.licenseState && (
                  <p className='text-red-500 text-sm'>
                    {errors?.license[index]?.licenseState.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseCountry'>License Country *</Label>
                <Controller
                  name={`license.${index}.licenseCountry`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseCountry' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.license?.[index]?.licenseCountry && (
                  <p className='text-red-500 text-sm'>
                    {errors?.license[index]?.licenseCountry.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseNumber'>License Number *</Label>
                <Controller
                  name={`license.${index}.licenseNumber`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <FileText className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseNumber' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.license?.[index]?.licenseNumber && (
                  <p className='text-red-500 text-sm'>
                    {errors?.license[index]?.licenseNumber.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseEffectiveDate'>
                  License Effective Date *
                </Label>
                <Controller
                  name={`license.${index}.licenseEffectiveDate`}
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
                {errors?.license?.[index]?.licenseEffectiveDate && (
                  <p className='text-red-500 text-sm'>
                    {errors?.license[index]?.licenseEffectiveDate.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseExpirationDate'>
                  License Expiration Date *
                </Label>
                <Controller
                  name={`license.${index}.licenseExpirationDate`}
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
                {errors?.license?.[index]?.licenseExpirationDate && (
                  <p className='text-red-500 text-sm'>
                    {errors?.license[index]?.licenseExpirationDate.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type='button'
              variant='outline'
              onClick={() => remove(index)}
              className='bg-red-500 text-white'
            >
              Remove
            </Button>
          </div>
        ))}
        {fields.length < 6 && (
          <Button
            type='button'
            variant='outline'
            onClick={() =>
              fields.length < 6 &&
              append({
                licenseType: '',
                licenseState: '',
                licenseCountry: '',
                licenseNumber: '',
                licenseEffectiveDate: '',
                licenseExpirationDate: '',
              })
            }
          >
            Add License
          </Button>
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                  <SelectContent className='bg-white'>
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
                  <SelectContent className='bg-white'>
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
          <Label htmlFor='englishLanguageExam'>English Language Exam *</Label>
          <Controller
            name='englishLanguageExam'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id='englishLanguageExam' className='pl-10'>
                    <SelectValue placeholder='Select option' />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value='yes'>Yes</SelectItem>
                    <SelectItem value='no'>No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          {errors.englishLanguageExam && (
            <p className='text-red-500 text-sm'>
              {errors.englishLanguageExam.message}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='spanishLanguageExam'>Spanish Language Exam *</Label>
          <Controller
            name='spanishLanguageExam'
            control={control}
            render={({ field }) => (
              <div className='relative'>
                <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id='languageExam' className='pl-10'>
                    <SelectValue placeholder='Select option' />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value='yes'>Yes</SelectItem>
                    <SelectItem value='no'>No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          {errors.spanishLanguageExam && (
            <p className='text-red-500 text-sm'>
              {errors.spanishLanguageExam.message}
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

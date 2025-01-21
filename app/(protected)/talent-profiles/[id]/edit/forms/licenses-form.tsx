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
  FileCheck,
  AlertCircle,
  Check,
} from 'lucide-react';
import { FormHeader } from '@/components/form-header';
import { ProfessionalLicense } from '@/shared/types/professionalLicense';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const licensesSchema = z.object({
  licenses: z.array(
    z.object({
      licenseType: z.string().min(1, 'License type is required'),
      licenseState: z.string().min(1, 'License state is required'),
      licenseCountry: z.string().min(1, 'License country is required'),
      licenseNumber: z.string().min(1, 'License number is required'),
      licenseIssuedBy: z.string().min(1, 'License issued by is required'),
      licenseEffectiveDate: z
        .string()
        .min(1, 'License effective date is required'),
      licenseExpirationDate: z
        .string()
        .min(1, 'License expiration date is required'),
      isPermanent: z.boolean().optional(),
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
  errorStatus: string;
}

export function LicensesForm({
  data,
  onUpdate,
  closeForm,
  loading,
  errorStatus,
}: LicensesFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LicensesFormData>({
    resolver: zodResolver(licensesSchema),
    defaultValues: {
      licenses:
        data.licenses.length > 0
          ? data.licenses.map((item) => ({
              ...item,
              licenseEffectiveDate:
                new Date(item.licenseEffectiveDate)
                  .toISOString()
                  .split('T')[0] || '',
              licenseExpirationDate:
                item.licenseExpirationDate === 'N/A'
                  ? ''
                  : new Date(item.licenseExpirationDate)
                      .toISOString()
                      .split('T')[0] || '',
              isPermanent: item.licenseExpirationDate === 'N/A',
            }))
          : [
              {
                licenseType: '',
                licenseState: '',
                licenseCountry: '',
                licenseNumber: '',
                licenseIssuedBy: '',
                licenseEffectiveDate: '',
                licenseExpirationDate: '',
                isPermanent: false,
              },
            ],
      nclexRn: data.nclexRn || '',
      euRn: data.euRn || '',
      englishLanguageExam: data.englishLanguageExam,
      spanishLanguageExam: data.spanishLanguageExam,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'licenses',
  });

  const onSubmit = (formData: LicensesFormData) => {
    onUpdate({
      ...formData,
      licenses: formData.licenses.map((license) => {
        const { isPermanent, ...rest } = license;
        return {
          ...rest,
          licenseExpirationDate: isPermanent
            ? 'N/A'
            : new Date(license.licenseExpirationDate).toISOString(),
        };
      }),
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
                  name={`licenses.${index}.licenseType`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <Award className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseType' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.licenses?.[index]?.licenseType && (
                  <p className='text-red-500 text-sm'>
                    {errors?.licenses[index]?.licenseType.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseState'>License State *</Label>
                <Controller
                  name={`licenses.${index}.licenseState`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseState' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.licenses?.[index]?.licenseState && (
                  <p className='text-red-500 text-sm'>
                    {errors?.licenses[index]?.licenseState.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseCountry'>License Country *</Label>
                <Controller
                  name={`licenses.${index}.licenseCountry`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseCountry' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.licenses?.[index]?.licenseCountry && (
                  <p className='text-red-500 text-sm'>
                    {errors?.licenses[index]?.licenseCountry.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='licenseIssuedBy'>License Issued By *</Label>
                <Controller
                  name={`licenses.${index}.licenseIssuedBy`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <FileCheck className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input
                        id='licenseIssuedBy'
                        className='pl-10'
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.licenses?.[index]?.licenseIssuedBy && (
                  <p className='text-red-500 text-sm'>
                    {errors?.licenses[index]?.licenseIssuedBy.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseNumber'>License Number *</Label>
                <Controller
                  name={`licenses.${index}.licenseNumber`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <FileText className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input id='licenseNumber' className='pl-10' {...field} />
                    </div>
                  )}
                />
                {errors?.licenses?.[index]?.licenseNumber && (
                  <p className='text-red-500 text-sm'>
                    {errors?.licenses[index]?.licenseNumber.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseEffectiveDate'>
                  License Effective Date *
                </Label>
                <Controller
                  name={`licenses.${index}.licenseEffectiveDate`}
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
                {errors?.licenses?.[index]?.licenseEffectiveDate && (
                  <p className='text-red-500 text-sm'>
                    {errors?.licenses[index]?.licenseEffectiveDate.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='licenseExpirationDate'>
                  License Expiration Date *
                </Label>
                <Controller
                  name={`licenses.${index}.licenseExpirationDate`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600' />
                      <Input
                        type={
                          watch(`licenses.${index}.isPermanent`)
                            ? 'text'
                            : 'date'
                        }
                        id='licenseExpirationDate'
                        className='pl-10'
                        {...field}
                        disabled={watch(`licenses.${index}.isPermanent`)}
                      />
                    </div>
                  )}
                />
                <Controller
                  name={`licenses.${index}.isPermanent`}
                  control={control}
                  render={({ field }) => (
                    <div className='flex items-center justify-start'>
                      <Input
                        id='isPermanent'
                        type='checkbox'
                        className='h-4 w-4 mr-2 cursor-pointer'
                        {...field}
                        checked={field.value}
                        value={field.value ? 'true' : 'false'}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          field.onChange(isChecked);
                          if (isChecked) {
                            setValue(
                              `licenses.${index}.licenseExpirationDate`,
                              'N/A'
                            );
                          } else {
                            setValue(
                              `licenses.${index}.licenseExpirationDate`,
                              ''
                            );
                          }
                        }}
                      />
                      <Label
                        className='text-sm font-normal cursor-pointer'
                        htmlFor='isPermanent'
                      >
                        Not Available
                      </Label>
                    </div>
                  )}
                />
                {errors?.licenses?.[index]?.licenseExpirationDate && (
                  <p className='text-red-500 text-sm'>
                    {errors?.licenses[index]?.licenseExpirationDate.message}
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
                licenseIssuedBy: '',
                isPermanent: false,
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
                    <SelectItem value='Yes'>Yes</SelectItem>
                    <SelectItem value='No'>No</SelectItem>
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
                    <SelectItem value='Yes'>Yes</SelectItem>
                    <SelectItem value='No'>No</SelectItem>
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
      {errorStatus && (
        <Alert variant='destructive' className='mt-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorStatus}</AlertDescription>
        </Alert>
      )}
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

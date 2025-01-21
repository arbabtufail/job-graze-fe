'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GraduationCap, Briefcase, Globe, AlertCircle } from 'lucide-react';
import { FormHeader } from '@/components/form-header';
import { EducationAndExperience } from '@/shared/types/educationAndExperience';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const educationSchema = z.object({
  education: z
    .array(
      z.object({
        degree: z
          .string()
          .min(1, 'Education degree is required')
          .max(254, 'Education degree must be 254 characters or less'),
        year: z
          .string()
          .min(4, 'Graduation year must be 4 digits')
          .max(4, 'Graduation year must be 4 digits'),
        school: z
          .string()
          .min(1, 'School/University name is required')
          .max(254, 'School/University name must be 254 characters or less'),
      })
    )
    .min(1, 'At least one education record is required'),
  jobExperiences: z.array(
    z
      .object({
        jobTitle: z
          .string()
          .min(1, 'Job title is required')
          .max(254, 'Job title must be 254 characters or less'),
        rolesAndResponsibilities: z
          .string()
          .max(254, 'Roles & responsibilities must be 254 characters or less')
          .optional(),
        startDate: z.string().min(1, 'Start date is required'),
        endDate: z.string().min(1, 'End date is required'),
        isPermanent: z.boolean().optional(),
      })
      .refine(
        (data) =>
          data.isPermanent ||
          new Date(data.startDate) <= new Date(data.endDate),
        {
          message: 'Start date cannot be later than the end date',
          path: ['startDate'], // Attach error to the `endDate` field
        }
      )
  ),
  languages: z
    .string()
    .min(1, 'Languages spoken is required')
    .refine(
      (value) =>
        value.split(',').filter((lang) => lang.trim() !== '').length <= 4,
      { message: 'You can specify a maximum of 4 languages' }
    ),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface EducationFormProps {
  data: EducationAndExperience;
  onUpdate: (data: any) => void;
  closeForm: () => void;
  loading: boolean;
  errorStatus: string;
}

export function EducationForm({
  data,
  onUpdate,
  closeForm,
  loading,
  errorStatus,
}: EducationFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education:
        data?.education?.length > 0
          ? data.education.map((education) => ({
              ...education,
              year: education.year.toString(),
            }))
          : [
              {
                degree: '',
                year: '',
                school: '',
              },
            ],
      jobExperiences:
        data?.jobExperiences?.length > 0
          ? data.jobExperiences.map((jobExperience) => ({
              ...jobExperience,
              startDate:
                new Date(jobExperience.startDate).toISOString().split('T')[0] ||
                '',
              endDate: jobExperience.endDate,
              isPermanent: jobExperience.endDate === 'N/A',
            }))
          : [
              {
                jobTitle: '',
                rolesAndResponsibilities: '',
                startDate: '',
                endDate: '',
                isPermanent: false,
              },
            ],
      languages: data.languages.join(',') || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'jobExperiences',
  });

  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const onSubmit = (formData: EducationFormData) => {
    onUpdate({
      education: formData.education.map((education) => ({
        ...education,
        year: Number(education.year),
      })),
      jobExperiences: formData.jobExperiences.map((jobExperience) => {
        const { isPermanent, ...rest } = jobExperience;
        return {
          ...rest,
          startDate: new Date(rest.startDate).toISOString(),
          endDate: isPermanent
            ? 'N/A'
            : new Date(rest.endDate).toISOString().split('T')[0],
        };
      }),
      languages: formData.languages.split(','),
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
        icon={GraduationCap}
        title='Education & Experience'
        color='text-emerald-600'
      />
      <div className='space-y-4'>
        <Label className='text-xl'>Education</Label>
        {educationFields?.map((field: any, index: number) => (
          <div key={field.id} className='space-y-4 p-4 border rounded-md '>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor={`degree-${index}`}>Education Degree *</Label>
                <Controller
                  name={`education.${index}.degree`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <GraduationCap className='absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600' />
                      <Input
                        id={`degree-${index}`}
                        className='pl-10'
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.education?.[index]?.degree && (
                  <p className='text-red-500 text-sm'>
                    {errors?.education?.[index]?.degree.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`year-${index}`}>Graduation Year *</Label>
                <Controller
                  name={`education.${index}.year`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <GraduationCap className='absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600' />
                      <Input
                        id={`year-${index}`}
                        className='pl-10'
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.education?.[index]?.year && (
                  <p className='text-red-500 text-sm'>
                    {errors?.education?.[index]?.year.message}
                  </p>
                )}
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor={`school-${index}`}>
                  School/University Name *
                </Label>
                <Controller
                  name={`education.${index}.school`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <GraduationCap className='absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600' />
                      <Input
                        id={`school-${index}`}
                        className='pl-10'
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.education?.[index]?.school && (
                  <p className='text-red-500 text-sm'>
                    {errors?.education?.[index]?.school.message}
                  </p>
                )}
              </div>
            </div>
            {!(index == 0) && (
              <Button
                type='button'
                variant='outline'
                onClick={() => educationRemove(index)}
                className='bg-red-500 text-white'
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {educationFields.length < 4 && (
          <Button
            type='button'
            variant='outline'
            onClick={() =>
              educationFields.length < 4 &&
              educationAppend({
                degree: '',
                year: '',
                school: '',
              })
            }
          >
            Add Education
          </Button>
        )}
      </div>
      <div className='space-y-4'>
        <Label className='text-xl'>Job Experience</Label>
        {fields?.map((field: any, index: number) => (
          <div key={field.id} className='space-y-4 p-4 border rounded-md'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor={`jobTitle-${index}`}>Job Title *</Label>
                <Controller
                  name={`jobExperiences.${index}.jobTitle`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <Briefcase className='absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600' />
                      <Input
                        id={`jobTitle-${index}`}
                        className='pl-10'
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors.jobExperiences?.[index]?.jobTitle && (
                  <p className='text-red-500 text-sm'>
                    {errors.jobExperiences[index]?.jobTitle?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor={`rolesAndResponsibilities-${index}`}>
                  Roles & Responsibilities
                </Label>
                <Controller
                  name={`jobExperiences.${index}.rolesAndResponsibilities`}
                  control={control}
                  render={({ field }) => (
                    <div className='relative'>
                      <Briefcase className='absolute left-3 top-3 text-emerald-600' />
                      <Textarea
                        id={`rolesAndResponsibilities-${index}`}
                        className='pl-10'
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors.jobExperiences?.[index]?.rolesAndResponsibilities && (
                  <p className='text-red-500 text-sm'>
                    {
                      errors.jobExperiences[index]?.rolesAndResponsibilities
                        ?.message
                    }
                  </p>
                )}
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor={`startDate-${index}`}>Start Date *</Label>
                <Controller
                  name={`jobExperiences.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <Input type='date' id={`startDate-${index}`} {...field} />
                  )}
                />
                {errors.jobExperiences?.[index]?.startDate && (
                  <p className='text-red-500 text-sm'>
                    {errors.jobExperiences[index]?.startDate?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor={`endDate-${index}`}>End Date *</Label>
                <Controller
                  name={`jobExperiences.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type={
                        watch(`jobExperiences.${index}.isPermanent`)
                          ? 'text'
                          : 'date'
                      }
                      id={`endDate-${index}`}
                      {...field}
                      disabled={watch(`jobExperiences.${index}.isPermanent`)}
                    />
                  )}
                />
                <Controller
                  name={`jobExperiences.${index}.isPermanent`}
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
                            setValue(`jobExperiences.${index}.endDate`, 'N/A');
                          } else {
                            setValue(`jobExperiences.${index}.endDate`, '');
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
                {errors.jobExperiences?.[index]?.endDate && (
                  <p className='text-red-500 text-sm'>
                    {errors.jobExperiences[index]?.endDate?.message}
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
        {fields.length < 5 && (
          <Button
            type='button'
            variant='outline'
            onClick={() =>
              fields.length < 5 &&
              append({
                jobTitle: '',
                rolesAndResponsibilities: '',
                startDate: '',
                endDate: '',
                isPermanent: false,
              })
            }
          >
            Add Job Experience
          </Button>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='languages'>Languages Spoken *</Label>
        <Controller
          name='languages'
          control={control}
          render={({ field }) => (
            <div className='relative'>
              <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600' />
              <Input id='languages' className='pl-10' {...field} />
            </div>
          )}
        />
        {errors.languages && (
          <p className='text-red-500 text-sm'>{errors.languages.message}</p>
        )}
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
          className='bg-emerald-600 text-white'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Save Changes'}
        </Button>
      </div>
    </motion.form>
  );
}

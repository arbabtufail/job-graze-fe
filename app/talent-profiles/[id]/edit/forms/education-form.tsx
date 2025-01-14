"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, Globe } from 'lucide-react'
import { FormHeader } from "@/components/form-header"

const educationSchema = z.object({
  educationDegree: z.string().min(1, "Education degree is required").max(254, "Education degree must be 254 characters or less"),
  graduationYear: z.string().min(4, "Graduation year must be 4 digits").max(4, "Graduation year must be 4 digits"),
  schoolUniversityName: z.string().min(1, "School/University name is required").max(254, "School/University name must be 254 characters or less"),
  jobExperience: z.array(z.object({
    jobTitle: z.string().min(1, "Job title is required").max(254, "Job title must be 254 characters or less"),
    rolesResponsibilities: z.string().min(1, "Roles & responsibilities are required").max(254, "Roles & responsibilities must be 254 characters or less"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
  })).min(1, "At least one job experience is required"),
  languagesSpoken: z.string().min(1, "Languages spoken is required"),
})

type EducationFormData = z.infer<typeof educationSchema>

interface EducationFormProps {
  data: any
  onUpdate: (data: any) => void
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educationDegree: data.EducationExperience?.EducationDegree || "",
      graduationYear: data.EducationExperience?.Year || "",
      schoolUniversityName: data.EducationExperience?.SchoolUniversityName || "",
      jobExperience: data.EducationExperience?.JobExperience || [{ jobTitle: "", rolesResponsibilities: "", startDate: "", endDate: "" }],
      languagesSpoken: data.EducationExperience?.LanguagesSpoken || "",
    },
  })

  const onSubmit = (formData: EducationFormData) => {
    onUpdate({
      EducationExperience: {
        EducationDegree: formData.educationDegree,
        Year: formData.graduationYear,
        SchoolUniversityName: formData.schoolUniversityName,
        JobExperience: formData.jobExperience,
        LanguagesSpoken: formData.languagesSpoken,
      },
    })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FormHeader icon={GraduationCap} title="Education & Experience" color="text-emerald-600" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="educationDegree">Education Degree</Label>
          <Controller
            name="educationDegree"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
                <Input id="educationDegree" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.educationDegree && <p className="text-red-500 text-sm">{errors.educationDegree.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="graduationYear">Graduation Year</Label>
          <Controller
            name="graduationYear"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
                <Input id="graduationYear" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.graduationYear && <p className="text-red-500 text-sm">{errors.graduationYear.message}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="schoolUniversityName">School/University Name</Label>
          <Controller
            name="schoolUniversityName"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
                <Input id="schoolUniversityName" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.schoolUniversityName && <p className="text-red-500 text-sm">{errors.schoolUniversityName.message}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Job Experience</Label>
        {control._fields.jobExperience?.map((field: any, index: number) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                <Controller
                  name={`jobExperience.${index}.jobTitle`}
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
                      <Input id={`jobTitle-${index}`} className="pl-10" {...field} />
                    </div>
                  )}
                />
                {errors.jobExperience?.[index]?.jobTitle && <p className="text-red-500 text-sm">{errors.jobExperience[index]?.jobTitle?.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`rolesResponsibilities-${index}`}>Roles & Responsibilities</Label>
                <Controller
                  name={`jobExperience.${index}.rolesResponsibilities`}
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 text-emerald-600" />
                      <Textarea id={`rolesResponsibilities-${index}`} className="pl-10" {...field} />
                    </div>
                  )}
                />
                {errors.jobExperience?.[index]?.rolesResponsibilities && <p className="text-red-500 text-sm">{errors.jobExperience[index]?.rolesResponsibilities?.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                <Controller
                  name={`jobExperience.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <Input type="date" id={`startDate-${index}`} {...field} />
                  )}
                />
                {errors.jobExperience?.[index]?.startDate && <p className="text-red-500 text-sm">{errors.jobExperience[index]?.startDate?.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Controller
                  name={`jobExperience.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <Input type="date" id={`endDate-${index}`} {...field} />
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="languagesSpoken">Languages Spoken</Label>
        <Controller
          name="languagesSpoken"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
              <Input id="languagesSpoken" className="pl-10" {...field} />
            </div>
          )}
        />
        {errors.languagesSpoken && <p className="text-red-500 text-sm">{errors.languagesSpoken.message}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className="bg-emerald-600 text-white">Save Changes</Button>
      </div>
    </motion.form>
  )
}


"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Star, Zap } from 'lucide-react'
import { FormHeader } from "@/components/form-header"

const profileSchema = z.object({
  profileHeadline: z.string().min(1, "Profile headline is required").max(254, "Profile headline must be 254 characters or less"),
  backgroundSummary: z.string().min(1, "Background summary is required").max(500, "Background summary must be 500 characters or less"),
  availableStartDate: z.string().min(1, "Available start date is required"),
  specialties: z.string().min(1, "Specialties are required"),
  skills: z.string().min(1, "Skills are required"),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  data: any
  onUpdate: (data: any) => void
}

export function ProfileForm({ data, onUpdate }: ProfileFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profileHeadline: data.ProfileDetails?.ProfileHeadline || "",
      backgroundSummary: data.ProfileDetails?.BackgroundSummary || "",
      availableStartDate: data.ProfileDetails?.AvailableStartDate || "",
      specialties: data.ProfileDetails?.Specialties || "",
      skills: data.ProfileDetails?.Skills || "",
    },
  })

  const onSubmit = (formData: ProfileFormData) => {
    onUpdate({
      ProfileDetails: {
        ProfileHeadline: formData.profileHeadline,
        BackgroundSummary: formData.backgroundSummary,
        AvailableStartDate: formData.availableStartDate,
        Specialties: formData.specialties,
        Skills: formData.skills,
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
      <FormHeader icon={FileText} title="Profile Details" color="text-violet-600" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profileHeadline">Profile Headline</Label>
          <Controller
            name="profileHeadline"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-600" />
                <Input id="profileHeadline" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.profileHeadline && <p className="text-red-500 text-sm">{errors.profileHeadline.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="backgroundSummary">Background Summary</Label>
          <Controller
            name="backgroundSummary"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-violet-600" />
                <Textarea id="backgroundSummary" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.backgroundSummary && <p className="text-red-500 text-sm">{errors.backgroundSummary.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="availableStartDate">Available Start Date</Label>
          <Controller
            name="availableStartDate"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-600" />
                <Input type="date" id="availableStartDate" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.availableStartDate && <p className="text-red-500 text-sm">{errors.availableStartDate.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialties">Specialties</Label>
          <Controller
            name="specialties"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-600" />
                <Input id="specialties" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.specialties && <p className="text-red-500 text-sm">{errors.specialties.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-600" />
                <Input id="skills" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className="bg-violet-600 text-white">Save Changes</Button>
      </div>
    </motion.form>
  )
}


"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { User, Phone, MapPin, Globe, FileText, Check } from 'lucide-react'
import { FormHeader } from "@/components/form-header"
import { FileUpload } from "@/components/file-upload"

const personalInfoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required").max(50, "First name must be 50 characters or less"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be 50 characters or less"),
  mobileNumber: z.string().regex(/^[0-9]{8,12}$/, "Invalid phone number"),
  country: z.string().min(1, "Country is required"),
  stateProvince: z.string().min(1, "State/Province is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip code is required").max(10, "Zip code must be 10 characters or less"),
  address: z.string().min(1, "Address is required").max(500, "Address must be 500 characters or less"),
  eligibility: z.boolean(),
  photo: z.any().optional(),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

interface PersonalInfoFormProps {
  data: any
  onUpdate: (data: any) => void
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      title: data.Title || "",
      firstName: data.FirstName || "",
      lastName: data.LastName || "",
      mobileNumber: data.MobileNumber || "",
      country: data.Location?.Country || "",
      stateProvince: data.Location?.StateProvince || "",
      city: data.Location?.City || "",
      zipCode: data.Location?.ZipCode || "",
      address: data.Location?.Address || "",
      eligibility: data.Eligibility || false,
    },
  })

  const onSubmit = (formData: PersonalInfoFormData) => {
    onUpdate({
      Title: formData.title,
      FirstName: formData.firstName,
      LastName: formData.lastName,
      MobileNumber: formData.mobileNumber,
      Location: {
        Country: formData.country,
        StateProvince: formData.stateProvince,
        City: formData.city,
        ZipCode: formData.zipCode,
        Address: formData.address,
      },
      Eligibility: formData.eligibility,
      Photo: formData.photo,
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
      <FormHeader icon={User} title="Personal Information" color="text-blue-600" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="title">
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Miss">Miss</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <Input id="firstName" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <Input id="lastName" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Controller
            name="mobileNumber"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <Input id="mobileNumber" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <Input id="country" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stateProvince">State/Province</Label>
          <Controller
            name="stateProvince"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <Input id="stateProvince" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.stateProvince && <p className="text-red-500 text-sm">{errors.stateProvince.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <Input id="city" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                <Input id="zipCode" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-blue-600" />
              <Textarea id="address" className="pl-10 w-full" {...field} />
            </div>
          )}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="eligibility"
          control={control}
          render={({ field }) => (
            <Switch
              id="eligibility"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-blue-600"
            />
          )}
        />
        <Label htmlFor="eligibility">Eligible for employment</Label>
      </div>

      <FileUpload
        onFileSelect={(file) => onUpdate({ Photo: file })}
        accept="image/*"
        maxSize={5 * 1024 * 1024} // 5MB
      />

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className="bg-blue-600 text-white">Save Changes</Button>
      </div>
    </motion.form>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, Check, User, Lock, Eye, EyeOff } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().optional(),
})

const securitySchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
type SecurityFormData = z.infer<typeof securitySchema>

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
    },
  })

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onPersonalInfoSubmit = async (data: PersonalInfoFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Personal Info submitted:", data)
    toast({
      title: "Personal Information Updated",
      description: "Your personal information has been successfully updated.",
      duration: 3000,
    })
  }

  const onSecuritySubmit = async (data: SecurityFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Security settings submitted:", data)
    toast({
      title: "Password Reset",
      description: "Your password has been successfully reset.",
      duration: 3000,
    })
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/)) strength += 25
    if (password.match(/[A-Z]/)) strength += 25
    if (password.match(/[0-9]/)) strength += 25
    setPasswordStrength(strength)
  }

  useEffect(() => {
    const subscription = securityForm.watch((value, { name }) => {
      if (name === "newPassword") {
        calculatePasswordStrength(value.newPassword || "")
      }
    })
    return () => subscription.unsubscribe()
  }, [securityForm.watch])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="personal" className="flex items-center justify-center py-3">
                  <div className="bg-[#F2994A] p-2 rounded-full mr-2">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  Personal
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center justify-center py-3">
                  <div className="bg-[#004E64] p-2 rounded-full mr-2">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  Reset Password
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="border-t-4 border-t-[#F2994A]">
                  <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}>
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#F2994A] flex items-center">
                        <User className="w-6 h-6 mr-2" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Controller
                            name="firstName"
                            control={personalInfoForm.control}
                            render={({ field }) => (
                              <Input id="firstName" placeholder="John" {...field} />
                            )}
                          />
                          {personalInfoForm.formState.errors.firstName && (
                            <p className="text-sm text-red-500">{personalInfoForm.formState.errors.firstName.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Controller
                            name="lastName"
                            control={personalInfoForm.control}
                            render={({ field }) => (
                              <Input id="lastName" placeholder="Doe" {...field} />
                            )}
                          />
                          {personalInfoForm.formState.errors.lastName && (
                            <p className="text-sm text-red-500">{personalInfoForm.formState.errors.lastName.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Controller
                          name="email"
                          control={personalInfoForm.control}
                          render={({ field }) => (
                            <Input id="email" type="email" placeholder="john.doe@example.com" {...field} />
                          )}
                        />
                        {personalInfoForm.formState.errors.email && (
                          <p className="text-sm text-red-500">{personalInfoForm.formState.errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Controller
                          name="phone"
                          control={personalInfoForm.control}
                          render={({ field }) => (
                            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...field} />
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Controller
                          name="bio"
                          control={personalInfoForm.control}
                          render={({ field }) => (
                            <textarea
                              id="bio"
                              placeholder="Tell us about yourself"
                              className="w-full h-32 px-3 py-2 text-sm rounded-md border border-input bg-background"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        disabled={!personalInfoForm.formState.isValid || personalInfoForm.formState.isSubmitting}
                        className="bg-[#F2994A] hover:bg-[#E67D19] text-white"
                      >
                        {personalInfoForm.formState.isSubmitting && <AlertCircle className="mr-2 h-4 w-4 animate-spin" />}
                        {personalInfoForm.formState.isSubmitting ? "Updating..." : "Update Personal Information"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="border-t-4 border-t-[#004E64]">
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#004E64] flex items-center">
                        <Lock className="w-6 h-6 mr-2" />
                        Reset Password
                      </CardTitle>
                      <CardDescription>Change your account password here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password *</Label>
                        <div className="relative">
                          <Controller
                            name="newPassword"
                            control={securityForm.control}
                            render={({ field }) => (
                              <Input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                {...field}
                              />
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-[#4D4D4D]" />
                            ) : (
                              <Eye className="h-4 w-4 text-[#4D4D4D]" />
                            )}
                          </button>
                        </div>
                        {securityForm.formState.errors.newPassword && (
                          <p className="text-sm text-red-500">{securityForm.formState.errors.newPassword.message}</p>
                        )}
                        <Progress value={passwordStrength} className="w-full" />
                        <p className="text-sm text-muted-foreground">
                          Password strength: {passwordStrength === 100 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                        <Controller
                          name="confirmPassword"
                          control={securityForm.control}
                          render={({ field }) => (
                            <Input
                              id="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                          )}
                        />
                        {securityForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-red-500">{securityForm.formState.errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        disabled={!securityForm.formState.isValid || securityForm.formState.isSubmitting}
                        className="bg-[#004E64] hover:bg-[#003A4B] text-white"
                      >
                        {securityForm.formState.isSubmitting && <AlertCircle className="mr-2 h-4 w-4 animate-spin" />}
                        {securityForm.formState.isSubmitting ? "Resetting..." : "Reset Password"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}


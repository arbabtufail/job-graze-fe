"use client"

import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { Users, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStep(2)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempted with:", email, password)
    // Here you would typically handle the login logic
    // For now, we'll just redirect to the dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#004D4D] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-[#E6F4F1] p-12 flex flex-col justify-between">
          <div>
            <Image
              src="https://fcoa.org/images/JobGraze_vert_2023.png"
              alt="JobGraze Logo"
              width={180}
              height={56}
              className="mb-8"
            />
            <h1 className="text-4xl font-bold mb-4 text-[#004D4D]">Welcome to JobGraze</h1>
            <p className="text-[#4D4D4D] mb-8">
              Healthcare Staffing and Job Search Made Simple
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#004D4D] shadow-md flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#004D4D]">Talent Management</h3>
                <p className="text-sm text-[#4D4D4D]">Efficiently manage your healthcare talent pool</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#004D4D] shadow-md flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#004D4D]">Bulk Upload</h3>
                <p className="text-sm text-[#4D4D4D]">Easily upload and update multiple profiles</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-12 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-[#004D4D] mb-8">Sign In</h2>
            <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#4D4D4D]">Email</Label>
                    <Input
                      id="email"
                      placeholder="name@company.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-[#E6F4F1] shadow-sm"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#F38C28] hover:bg-[#E67D19] text-white py-6 shadow-sm">
                    Continue
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#4D4D4D]">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pr-10 border-[#E6F4F1] shadow-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-[#4D4D4D]" />
                        ) : (
                          <Eye className="h-4 w-4 text-[#4D4D4D]" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#F38C28] hover:bg-[#E67D19] text-white py-6 shadow-sm">
                    Sign In
                  </Button>
                </>
              )}
            </form>

            <div className="mt-6 text-center space-y-2">
              <Link href="/forgot-password" className="text-sm text-[#00B4D8] hover:underline">
                Forgot password?
              </Link>
              <p className="text-[#4D4D4D]">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-[#00B4D8] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


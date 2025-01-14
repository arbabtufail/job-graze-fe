"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { Mail } from 'lucide-react'
import { forgotPassword } from "@/app/actions/auth-actions"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await forgotPassword(email)
      toast({
        title: "Reset code sent",
        description: "Check your email for the reset code.",
        duration: 5000,
      })
      router.push(`/reset-password?email=${encodeURIComponent(email)}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-4xl font-bold mb-4 text-[#004D4D]">Forgot Password</h1>
            <p className="text-[#4D4D4D] mb-8">
              Don't worry, we'll send you reset instructions.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-12 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-[#004D4D] mb-8">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#4D4D4D]">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D4D4D]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 border-[#E6F4F1] shadow-sm"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-[#F38C28] hover:bg-[#E67D19] text-white py-6 shadow-sm">
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-[#00B4D8] hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Eye, EyeOff, KeyRound, Lock, Check, X } from 'lucide-react'
import { resetPassword } from "@/app/actions/auth-actions"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { ResetCodeInput } from "@/components/reset-code-input"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  useEffect(() => {
    validatePassword(newPassword)
  }, [newPassword])

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword)
  }, [newPassword, confirmPassword])

  const validatePassword = (password: string) => {
    let strength = 0
    const errors: string[] = []

    // Password validation logic (unchanged)
    // ...

    setPasswordStrength(strength)
    setPasswordErrors(errors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
        duration: 5000,
      })
      setIsLoading(false)
      return
    }

    if (passwordStrength < 100) {
      toast({
        title: "Error",
        description: "Password does not meet strength requirements.",
        variant: "destructive",
        duration: 5000,
      })
      setIsLoading(false)
      return
    }

    try {
      await resetPassword(email, resetCode, newPassword)
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password.",
        duration: 5000,
      })
      setTimeout(() => router.push('/login'), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="resetCode" className="text-[#4D4D4D]">Reset Code</Label>
        <div className="flex items-center">
          <KeyRound className="h-5 w-5 text-[#4D4D4D] mr-2" />
          <ResetCodeInput length={6} onChange={setResetCode} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-[#4D4D4D]">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D4D4D]" />
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="pl-10 pr-10 border-[#E6F4F1] shadow-sm"
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
        <Progress value={passwordStrength} className="w-full" />
        <ul className="text-sm text-[#4D4D4D]">
          {passwordErrors.map((error, index) => (
            <li key={index} className="flex items-center">
              {passwordStrength === 100 ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <X className="h-4 w-4 text-red-500 mr-2" />
              )}
              {error}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-[#4D4D4D]">Confirm New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4D4D4D]" />
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="pl-10 pr-10 border-[#E6F4F1] shadow-sm"
          />
        </div>
        {confirmPassword && (
          <p className={`text-sm ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
            {passwordsMatch ? (
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Passwords match
              </span>
            ) : (
              <span className="flex items-center">
                <X className="h-4 w-4 mr-2" />
                Passwords do not match
              </span>
            )}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isLoading || passwordStrength < 100 || !passwordsMatch || !resetCode} className={`w-full py-6 shadow-sm ${
        isLoading || passwordStrength < 100 || !passwordsMatch || !resetCode
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-[#F38C28] hover:bg-[#E67D19] text-white'
      }`}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  )
}


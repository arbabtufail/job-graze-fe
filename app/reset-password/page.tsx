import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ResetPasswordForm } from "./reset-password-form"

export default function ResetPasswordPage() {
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
            <h1 className="text-4xl font-bold mb-4 text-[#004D4D]">Reset Password</h1>
            <p className="text-[#4D4D4D] mb-8">
              Enter the reset code sent to your email and choose a new password.
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-12 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-[#004D4D] mb-8">New Password</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <ResetPasswordForm />
            </Suspense>
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


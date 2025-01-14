"use server"

import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'

// This is a mock function to simulate sending an email
async function sendResetCodeEmail(email: string, resetCode: string) {
  // In a real application, you would use an email service to send the reset code
  console.log(`Sending reset code ${resetCode} to ${email}`)
}

export async function forgotPassword(email: string) {
  // Generate a random 6-digit reset code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString()

  // In a real application, you would store this reset code in your database
  // associated with the user's email and set an expiration time

  // Send the reset code to the user's email
  await sendResetCodeEmail(email, resetCode)

  // For demonstration purposes, we'll just log the reset code
  console.log(`Reset code for ${email}: ${resetCode}`)

  revalidatePath("/login")

  return { success: true, message: "Reset code sent successfully." }
}

export async function resetPassword(email: string, resetCode: string, newPassword: string) {
  // In a real application, you would:
  // 1. Verify that the reset code is valid and not expired
  // 2. Update the user's password in your database
  // 3. Invalidate the reset code

  // For demonstration purposes, we'll just log the action
  console.log(`Resetting password for ${email} with code ${resetCode}`)

  // Simulate a delay to mimic database operations
  await new Promise(resolve => setTimeout(resolve, 1000))

  // In a real application, you would handle errors here
  // For now, we'll assume the operation was successful

  revalidatePath("/login")

  return { success: true, message: "Password reset successfully." }
}

export async function logout() {
  // In a real application, you would invalidate the session on the server
  // For this example, we'll just remove the session cookie
  cookies().delete('session')

  // Revalidate the login page
  revalidatePath("/login")

  return { success: true, message: "Logged out successfully." }
}


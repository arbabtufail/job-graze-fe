import React, { useState, useRef, KeyboardEvent } from 'react'
import { Input } from "@/components/ui/input"

interface ResetCodeInputProps {
  length: number
  onChange: (code: string) => void
}

export function ResetCodeInput({ length, onChange }: ResetCodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''))
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    onChange(newCode.join(''))

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex space-x-2">
      {code.map((digit, index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => inputs.current[index] = el}
          className="w-12 h-12 text-center text-lg"
        />
      ))}
    </div>
  )
}


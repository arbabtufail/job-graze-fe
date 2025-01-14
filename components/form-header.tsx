import { type LucideIcon } from 'lucide-react'

interface FormHeaderProps {
  icon: LucideIcon
  title: string
  color: string
}

export function FormHeader({ icon: Icon, title, color }: FormHeaderProps) {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Icon className={`w-6 h-6 ${color}`} />
      <h2 className={`text-2xl font-semibold ${color}`}>{title}</h2>
    </div>
  )
}


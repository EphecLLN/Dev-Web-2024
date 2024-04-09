import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel({label, type, dest, id, placeholder}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={dest}>{label}</Label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  )
}








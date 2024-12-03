import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputWithLabel({fieldName, fieldValue, setField, type="text"}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={fieldName}>{fieldName}</Label>
        <Input 
            type= {type} 
            id= {fieldName} 
            placeholder= {fieldName}
            value= {fieldValue} 
            onChange= { (e) => setField(e.target.value) }
        />
    </div>
  )
}

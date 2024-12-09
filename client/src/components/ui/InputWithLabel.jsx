import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputWithLabel({className, fieldName, fieldValue, setField, type="text"}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-y-1 text-white-50">
        <Label htmlFor={fieldName}>{fieldName}</Label>
        <Input 
            className= "bg-grey-800 py-1 px-3 border-none"
            type= {type} 
            id= {fieldName} 
            placeholder= {fieldName}
            value= {fieldValue} 
            onChange= { (e) => setField(e.target.value) }
        />
    </div>
  )
}

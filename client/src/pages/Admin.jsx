import NavBar from "@/components/NavBar"
import DataTable from "@/components/DataTable"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const Admin = () => {
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center space-x-3 mt-4">
        <div className="flex items-center"> 
          <Input placeholder="Rechercher ..." />
        </div>
        <div className="flex items-center"> 
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="age">Age</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="phone">Téléphone</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DataTable />
    </>
  )
}

export default Admin





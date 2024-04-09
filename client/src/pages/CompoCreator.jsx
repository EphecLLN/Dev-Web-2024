import NavBar from "@/components/NavBar"
import DataTable from "@/components/DataTable"

const CompoCreator = () => {
  return (
    <div>
        <NavBar />
        <div className="p-4 flex">
            <h1 className="lg:text-2xl md:text-xl sm:text-l font-semibold">Créer une équipe</h1>
        </div>
        <DataTable />
    </div>
  )
}

export default CompoCreator













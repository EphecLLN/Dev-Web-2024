import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950 mt-20">
      <div className="container grid gap-4 px-4 text-center md:grid-cols-2 md:px-6 lg:gap-6">
        <div className="space-y-2 mt-10">
          <h3 className="text-2xl font-bold tracking-tighter">Vragen over ploegen, trainingen, voetbal of iets anders?</h3>
          <p className="text-gray-500 dark:text-gray-400">Contact us!</p>
        </div>
        <form className="space-y-4 md:justify-self-end mt-10">
          <div className="grid grid-cols-2 gap-4">
            <Input className="border-gray-200 col-span-1 dark:border-gray-800" placeholder="Name" type="text" />
            <Input className="border-gray-200 col-span-1 dark:border-gray-800" placeholder="Email" type="email" />
          </div>
          <Button className="w-full" size="lg" type="submit">
            Contact Sales
          </Button>
        </form>
      </div>
      <div className="container flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Link className="flex items-center space-x-2 font-bold" href="#">
            <span>RFC Wetteren</span>
          </Link>
          <span className="hidden text-sm font-medium sm:inline">© 2024 RFC Wetteren</span>
        </div>
        <div className="flex items-center space-x-4 mb-10">
          <nav className="hidden space-x-4 text-sm font-medium lg:flex lg:space-x-6">
            <Link
              className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#">Facebook</Link>
            <Link
              className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#">Instagram</Link>
            <Link
                className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#">Twitter</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}


































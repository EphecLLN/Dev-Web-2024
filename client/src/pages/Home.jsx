
import '../App.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import UpcomingMatches from '../layouts/UpcomingMatches'
import DataTable from '../components/DataTable'

function Home() {
  return (
    <>
      <NavBar />
      <div className="mt-5 mx-auto rounded-lg overflow-hidden w-full sm:w-5/6 md:w-4/6 lg:w-2/3 xl:w-1/2">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-96 xl:h-96 bg-cover bg-center">
          <div className="absolute inset-0 bg-green-500 opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <UpcomingMatches />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home



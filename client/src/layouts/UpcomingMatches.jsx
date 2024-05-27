

const MatchTitle = ({date, opponent}) => {
  return (
    <div className="grid grid-cols-3 items-center justify-center gap-2 lg:grid-cols-3">
        <p className="text-sm font-medium m-0">{date}</p>
        <p className="text-sm font-medium text-center">vs</p>
        <p className="text-sm font-medium text-left">{opponent}</p>
    </div>
  )
}

const UpcomingMatches = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Les matchs à venir</h2>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-4 sm:gap-6 lg:gap-8">
                <MatchTitle date="15 mai 2024" opponent="Genk" />
                <MatchTitle date="30 mai 2024" opponent="Man Utd" />
                <MatchTitle date="15 mai 2024" opponent="RUSG" />
            </div>
        </div>
    </section>
  )
}

export default UpcomingMatches




























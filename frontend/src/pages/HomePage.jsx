import CategoryItem from "../components/CategoryItem"

const categories = [
    {href: "/Action", name: "Action", imageUrl: "/action.jpg"},
    {href: "/Adventure", name: "Adventure", imageUrl: "/adventure.jpg"},
    {href: "/Horror", name: "Horror", imageUrl: "/horror.jpeg"},
    {href: "/Racing", name: "Racing", imageUrl: "/racing.jpeg"},
    {href: "/Sports", name: "Sports", imageUrl: "/sports.jpg"},
    {href: "/Strategy", name: "Strategy", imageUrl: "/strategy.jpg"},
]
const HomePage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-center text-5xl sm:text-6xl font-bold text-slate-400 mb-4">
                What do you want to play today?
            </h1>
            <p className="text-center text-xl text-gray-300 mb-12">
                Discover the hottest and newest games
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                    <CategoryItem
                        category={category}
                        key={category.name}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage
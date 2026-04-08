import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Book, ChefHat, Clock, Filter, LogOut, PlayCircle, Search, Star, Utensils } from 'lucide-react'
import { CATEGORIES, RECIPES } from '@/data/recipes'

type StudentSection = 'recipes' | 'continue' | 'favorites'

export function Dashboard() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<StudentSection>('recipes')
  const [selectedCategory, setSelectedCategory] = useState('Tudo')
  const [searchTerm, setSearchTerm] = useState('')
  const [showOnlyTopRated, setShowOnlyTopRated] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 3])
  const [completedIds] = useState<number[]>([1])
  const [continueWatchingIds] = useState<number[]>([2, 4])

  const visibleRecipes = useMemo(() => {
    let items = RECIPES.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'Tudo' || recipe.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    if (showOnlyTopRated) {
      items = items.filter((recipe) => recipe.rating >= 4.9)
    }

    if (activeSection === 'favorites') {
      items = items.filter((recipe) => favoriteIds.includes(recipe.id))
    }

    if (activeSection === 'continue') {
      items = items.filter((recipe) => continueWatchingIds.includes(recipe.id))
    }

    return items
  }, [activeSection, continueWatchingIds, favoriteIds, searchTerm, selectedCategory, showOnlyTopRated])

  function toggleFavorite(id: number) {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function handleLogout() {
    navigate('/login')
  }

  const sectionTitle =
    activeSection === 'recipes'
      ? 'Receitas Recomendadas para Voce'
      : activeSection === 'continue'
        ? 'Continue de onde voce parou'
        : 'Suas receitas favoritas'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 bg-white border-r shadow-sm hidden lg:block sticky top-0 h-screen p-8">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-serif italic text-primary">Piatto d'Oro</span>
        </Link>

        <nav className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => setActiveSection('recipes')}
            className={`w-full justify-start gap-4 h-12 ${
              activeSection === 'recipes'
                ? 'text-primary bg-primary/5'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Book className="h-5 w-5" />
            Minhas Receitas
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveSection('continue')}
            className={`w-full justify-start gap-4 h-12 ${
              activeSection === 'continue'
                ? 'text-primary bg-primary/5'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <PlayCircle className="h-5 w-5" />
            Continuar Assistindo
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveSection('favorites')}
            className={`w-full justify-start gap-4 h-12 ${
              activeSection === 'favorites'
                ? 'text-primary bg-primary/5'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Star className="h-5 w-5" />
            Favoritos
          </Button>
          <div className="pt-8 border-t mt-8">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-4 text-destructive hover:bg-destructive/10 h-12"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl text-secondary mb-2">Benvenuto, Chef Samuel</h1>
            <p className="text-muted-foreground">O que vamos preparar hoje para encantar o paladar?</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar receita..."
                className="pl-10 pr-4 h-12 w-64 lg:w-80 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setShowOnlyTopRated((current) => !current)}
              className={`h-12 w-12 rounded-xl group ${
                showOnlyTopRated ? 'border-primary bg-primary/5' : 'hover:border-primary'
              }`}
            >
              <Filter className={`h-5 w-5 ${showOnlyTopRated ? 'text-primary' : 'group-hover:text-primary'}`} />
            </Button>
          </div>
        </header>

        <section className="mb-12 overflow-x-auto pb-4">
          <div className="flex gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 h-10 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-muted-foreground hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Receitas visiveis</p>
            <p className="mt-2 text-2xl text-secondary">{visibleRecipes.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Favoritos salvos</p>
            <p className="mt-2 text-2xl text-secondary">{favoriteIds.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Aulas concluidas</p>
            <p className="mt-2 text-2xl text-secondary">{completedIds.length}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl mb-8 flex items-center gap-3 italic">
            <Utensils className="h-6 w-6 text-accent" />
            {sectionTitle}
          </h2>

          {visibleRecipes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-muted-foreground">
              Nenhuma receita encontrada com os filtros atuais.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {visibleRecipes.map((recipe) => {
                const isFavorite = favoriteIds.includes(recipe.id)
                const isCompleted = completedIds.includes(recipe.id)

                return (
                  <article
                    key={recipe.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 relative h-full flex flex-col"
                  >
                    <Link to={`/recipe/${recipe.id}`} className="group flex flex-col h-full">
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          onError={(event) => {
                            event.currentTarget.src = '/hero.png'
                          }}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-primary">
                          {recipe.category}
                        </div>
                        {isCompleted ? (
                          <div className="absolute bottom-4 left-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white">
                            Concluida
                          </div>
                        ) : null}
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(recipe.id)}
                      className={`absolute top-4 right-4 z-10 rounded-full p-2 transition-colors ${
                        isFavorite ? 'bg-primary text-white' : 'bg-black/40 text-white hover:bg-primary'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {recipe.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Book className="h-3.5 w-3.5" /> {recipe.difficulty}
                        </span>
                      </div>

                      <Link to={`/recipe/${recipe.id}`} className="flex-1">
                        <h3 className="text-xl mb-4 hover:text-primary transition-colors">{recipe.title}</h3>
                      </Link>

                      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1 text-sm font-bold text-secondary">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          {recipe.rating}
                        </div>
                        <Link
                          to={`/recipe/${recipe.id}`}
                          className="text-xs font-bold text-primary flex items-center gap-1"
                        >
                          Acessar Tutorial <PlayCircle className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

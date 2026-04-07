import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChefHat, Search, Book, Clock, PlayCircle, Star, Filter, LogOut, Utensils } from 'lucide-react'

const RECIPES = [
  {
    id: 1,
    title: "Tagliatelle al Ragù Bolognese",
    time: "3h 30m",
    difficulty: "Médio",
    rating: 4.9,
    category: "Massas",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Risotto ai Funghi Porcini",
    time: "45m",
    difficulty: "Difícil",
    rating: 4.8,
    category: "Arroz",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Tiramisù Classico",
    time: "30m",
    difficulty: "Fácil",
    rating: 5.0,
    category: "Sobremesas",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Pizza Margherita Napoletana",
    time: "24h (Fermentação)",
    difficulty: "Mestre",
    rating: 4.9,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800"
  }
]

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm hidden lg:block sticky top-0 h-screen p-8">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-serif italic text-primary">Piatto d'Oro</span>
        </Link>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-4 text-primary bg-primary/5 h-12">
            <Book className="h-5 w-5" />
            Minhas Receitas
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-4 text-muted-foreground hover:text-primary h-12">
            <PlayCircle className="h-5 w-5" />
            Continuar Assistindo
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-4 text-muted-foreground hover:text-primary h-12">
            <Star className="h-5 w-5" />
            Favoritos
          </Button>
          <div className="pt-8 border-t mt-8">
            <Button variant="ghost" className="w-full justify-start gap-4 text-destructive hover:bg-destructive/10 h-12">
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
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
                placeholder="Buscar receita..." 
                className="pl-10 pr-4 h-12 w-64 lg:w-80 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
              />
            </div>
            <Button size="icon" variant="outline" className="h-12 w-12 rounded-xl group hover:border-primary">
              <Filter className="h-5 w-5 group-hover:text-primary" />
            </Button>
          </div>
        </header>

        {/* Categories */}
        <section className="mb-12 overflow-x-auto pb-4">
          <div className="flex gap-4">
            {["Tudo", "Massas", "Arroz", "Pizzas", "Carnes", "Peixes", "Sobremesas"].map((cat, i) => (
              <button 
                key={i} 
                className={`px-6 h-10 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  i === 0 ? "bg-primary text-white" : "bg-white text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Recipe Grid */}
        <section>
          <h2 className="text-2xl mb-8 flex items-center gap-3 italic">
            <Utensils className="h-6 w-6 text-accent" />
            Receitas Recomendadas para Você
          </h2>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {RECIPES.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="group">
                <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 relative h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-primary">
                      {recipe.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full text-white cursor-pointer hover:bg-primary transition-colors">
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {recipe.time}</span>
                      <span className="flex items-center gap-1.5"><Book className="h-3.5 w-3.5" /> {recipe.difficulty}</span>
                    </div>
                    <h3 className="text-xl mb-4 group-hover:text-primary transition-colors flex-1">{recipe.title}</h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1 text-sm font-bold text-secondary">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        {recipe.rating}
                      </div>
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                        Acessar Tutorial <PlayCircle className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

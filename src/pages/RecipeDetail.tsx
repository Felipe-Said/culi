import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Book, CheckCircle2, ChefHat, ChevronRight, Clock, Play, PlayCircle, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RECIPES } from '@/data/recipes'

export function RecipeDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const recipeId = Number(id)
  const recipeIndex = RECIPES.findIndex((item) => item.id === recipeId)

  const recipe = recipeIndex >= 0 ? RECIPES[recipeIndex] : RECIPES[0]
  const previousRecipe = RECIPES[(recipeIndex - 1 + RECIPES.length) % RECIPES.length]
  const nextRecipe = RECIPES[(recipeIndex + 1) % RECIPES.length]
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([])
  const [servings, setServings] = useState(recipe.servings)
  const [completed, setCompleted] = useState(false)

  const ingredientProgress = useMemo(() => {
    return `${checkedIngredients.length}/${recipe.ingredients.length}`
  }, [checkedIngredients.length, recipe.ingredients.length])

  function toggleIngredient(index: number) {
    setCheckedIngredients((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 glass border-b px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-serif italic text-primary">Piatto d'Oro</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {recipe.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Utensils className="h-4 w-4" /> {recipe.difficulty}
          </span>
        </div>
        <Button onClick={() => setCompleted((current) => !current)} className="bg-primary text-white">
          {completed ? 'Concluido' : 'Marcar como Concluido'}
        </Button>
      </header>

      <main className="container py-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h1 className="text-5xl mb-6 text-secondary">{recipe.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed italic">{recipe.description}</p>
            </section>

            <section className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group">
              <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:bg-black/20 transition-colors cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 fill-current ml-1" />
                </div>
              </div>
              <img
                src={recipe.heroImage || recipe.image}
                alt={recipe.title}
                onError={(event) => {
                  event.currentTarget.src = '/hero.png'
                }}
                className="w-full h-full object-cover opacity-60"
              />
            </section>

            <section>
              <h2 className="text-3xl mb-8 flex items-center gap-3">
                <PlayCircle className="h-8 w-8 text-primary" />
                Passo a Passo
              </h2>
              <div className="space-y-8">
                {recipe.steps.map((step, index) => (
                  <div key={step.title} className="flex gap-6 p-8 rounded-3xl bg-secondary/5 border border-primary/5 hover:border-primary/20 transition-all group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-secondary">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-10">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm sticky top-32">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl flex items-center gap-3">
                  <Book className="h-6 w-6 text-accent" />
                  Ingredientes
                </h3>
                <span className="text-sm text-muted-foreground">{ingredientProgress}</span>
              </div>

              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient, index) => {
                  const checked = checkedIngredients.includes(index)
                  return (
                    <li key={ingredient}>
                      <button
                        type="button"
                        onClick={() => toggleIngredient(index)}
                        className="flex w-full items-start gap-3 text-left text-secondary/80 group"
                      >
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2
                            className={`h-5 w-5 transition-colors ${
                              checked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                            }`}
                          />
                        </div>
                        <span className={checked ? 'text-primary line-through' : 'group-hover:text-primary transition-colors'}>
                          {ingredient}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-muted-foreground">Porcoes:</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setServings((current) => Math.max(1, current - 1))}
                      className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-white"
                    >
                      -
                    </button>
                    <span className="font-bold">{servings} pessoas</span>
                    <button
                      type="button"
                      onClick={() => setServings((current) => current + 1)}
                      className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-white"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white h-12">
                  Adicionar ao Carrinho de Compras
                </Button>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <h3 className="text-xl mb-4 font-bold text-primary">Dica do Maestro</h3>
              <p className="text-sm text-secondary/70 leading-relaxed italic">
                Trabalhe com poucos ingredientes, mas acerte o tempo e o ponto. A tecnica define o resultado final.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t py-12 bg-slate-50">
        <div className="container flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(`/recipe/${previousRecipe.id}`)}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-white border group-hover:border-primary transition-colors">
              <ChevronRight className="h-6 w-6 rotate-180 group-hover:text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Anterior</p>
              <p className="font-bold group-hover:text-primary transition-colors text-lg">{previousRecipe.title}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/recipe/${nextRecipe.id}`)}
            className="text-right flex items-center gap-4 group cursor-pointer"
          >
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Proximo</p>
              <p className="font-bold group-hover:text-primary transition-colors text-lg">{nextRecipe.title}</p>
            </div>
            <div className="p-3 rounded-full bg-white border group-hover:border-primary transition-colors">
              <ChevronRight className="h-6 w-6 group-hover:text-primary" />
            </div>
          </button>
        </div>
      </footer>
    </div>
  )
}

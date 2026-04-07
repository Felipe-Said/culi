import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChefHat, ArrowLeft, Clock, Utensils, Play, Book, CheckCircle2, ChevronRight, PlayCircle } from 'lucide-react'

const RECIPE_DATA = {
  id: 1,
  title: "Tagliatelle al Ragù Bolognese",
  description: "O autêntico molho bolonhês requer tempo, paciência e os melhores ingredientes. Aprenda a técnica tradicional da região de Emilia-Romagna.",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  time: "3h 30m",
  servings: "4 pessoas",
  difficulty: "Médio",
  ingredients: [
    "500g de Tagliatelle fresco ao ovo",
    "300g de carne bovina moída (acém ou patinho)",
    "150g de carne suína moída (pancetta ou lombo)",
    "50g de manteiga sem sal",
    "1 cebola amarela pequena, picada finamente",
    "1 cenoura pequena, picada finamente",
    "1 talo de aipo, picado finamente",
    "1/2 copo de vinho branco seco",
    "2 colheres de sopa de extrato de tomate",
    "1 copo de leite integral",
    "Sal e pimenta do reino a gosto"
  ],
  steps: [
    { title: "O Soffritto", desc: "Em uma panela de ferro ou fundo grosso, derreta a manteiga e refogue a cebola, cenoura e aipo em fogo baixo até ficarem macios e translúcidos." },
    { title: "Selagem das Carnes", desc: "Adicione as carnes moídas e aumente o fogo. Cozinhe mexendo sempre até que toda a água evapore e a carne comece a dourar levemente." },
    { title: "Deglacear com Vinho", desc: "Despeje o vinho branco e deixe evaporar completamente em fogo médio-alto." },
    { title: "O Tomate", desc: "Dilua o extrato de tomate em um pouco de caldo ou água e adicione à panela. Reduza o fogo para o mínimo." },
    { title: "Cozimento Lento", desc: "Cozinhe com a panela semitampada por pelo menos 2 a 3 horas. Se secar demais, adicione um pouco de leite ou caldo aos poucos." },
    { title: "Finalização com Leite", desc: "Nos últimos 15 minutos, adicione o leite integral para conferir cremosidade e equilibrar a acidez do tomate." }
  ]
}

export function RecipeDetail() {
  const { id } = useParams()
  console.log("Cooking recipe:", id)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {RECIPE_DATA.time}</span>
          <span className="flex items-center gap-1.5"><Utensils className="h-4 w-4" /> {RECIPE_DATA.difficulty}</span>
        </div>
        <Button className="bg-primary text-white">Marcar como Concluído</Button>
      </header>

      <main className="container py-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h1 className="text-5xl mb-6 text-secondary">{RECIPE_DATA.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed italic">{RECIPE_DATA.description}</p>
            </section>

            {/* Video Player */}
            <section className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black group">
              <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:bg-black/20 transition-colors cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 fill-current ml-1" />
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=1200" 
                alt="Video Placeholder" 
                className="w-full h-full object-cover opacity-60"
              />
            </section>

            {/* Steps */}
            <section>
              <h2 className="text-3xl mb-8 flex items-center gap-3">
                <PlayCircle className="h-8 w-8 text-primary" />
                Passo a Passo
              </h2>
              <div className="space-y-8">
                {RECIPE_DATA.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 p-8 rounded-3xl bg-secondary/5 border border-primary/5 hover:border-primary/20 transition-all group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                      {i + 1}
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

          {/* Sidebar Area */}
          <aside className="space-y-10">
            {/* Ingredients */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm sticky top-32">
              <h3 className="text-2xl mb-6 flex items-center gap-3">
                <Book className="h-6 w-6 text-accent" />
                Ingredientes
              </h3>
              <ul className="space-y-4">
                {RECIPE_DATA.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary/80 group cursor-pointer">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">{ing}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-muted-foreground">Porções:</span>
                  <div className="flex items-center gap-3">
                    <button className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-white">-</button>
                    <span className="font-bold">{RECIPE_DATA.servings}</span>
                    <button className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-white">+</button>
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white h-12">
                  Adicionar ao Carrinho de Compras
                </Button>
              </div>
            </div>

            {/* Related Courses */}
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <h3 className="text-xl mb-4 font-bold text-primary">Dica do Maestro</h3>
              <p className="text-sm text-secondary/70 leading-relaxed italic">
                "Nunca use creme de leite em um Ragù Bolognese tradicional. O leite integral adicionado no final é o segredo para a textura correta e para neutralizar a acidez."
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Course Navigation */}
      <footer className="border-t py-12 bg-slate-50">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 rounded-full bg-white border group-hover:border-primary transition-colors">
              <ChevronRight className="h-6 w-6 rotate-180 group-hover:text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Anterior</p>
              <p className="font-bold group-hover:text-primary transition-colors text-lg">Massa Fresca Básica</p>
            </div>
          </div>
          
          <div className="text-right flex items-center gap-4 group cursor-pointer">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Próximo</p>
              <p className="font-bold group-hover:text-primary transition-colors text-lg">Cannoli Siciliano</p>
            </div>
            <div className="p-3 rounded-full bg-white border group-hover:border-primary transition-colors">
              <ChevronRight className="h-6 w-6 group-hover:text-primary" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

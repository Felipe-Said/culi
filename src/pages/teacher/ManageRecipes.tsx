import { Button } from '@/components/ui/button'
import { ChefHat, Plus, Search, Edit2, Trash2, LayoutDashboard, Utensils, Users, BarChart3, Settings, Eye, Star } from 'lucide-react'

const MANAGE_RECIPES = [
  { id: 1, title: "Tagliatelle al Ragù Bolognese", status: "Publicado", students: 1240, rating: 4.9 },
  { id: 2, title: "Risotto ai Funghi Porcini", status: "Publicado", students: 856, rating: 4.8 },
  { id: 3, title: "Pizza Margherita Napoletana", status: "Publicado", students: 3420, rating: 4.9 },
  { id: 4, title: "Ossobuco alla Milanese", status: "Rascunho", students: 0, rating: 0 },
]

export default function ManageRecipes() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Teacher Version */}
      <aside className="w-72 bg-secondary text-white hidden lg:block sticky top-0 h-screen p-8">
        <div className="flex items-center gap-2 mb-12">
          <ChefHat className="h-8 w-8 text-white" />
          <span className="text-2xl font-serif italic text-white">Maestro Panel</span>
        </div>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-4 text-white hover:bg-white/10 h-12">
            <LayoutDashboard className="h-5 w-5" />
            Visão Geral
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-4 text-accent bg-white/10 h-12">
            <Utensils className="h-5 w-5" />
            Gerenciar Receitas
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-4 text-white/70 hover:text-white hover:bg-white/10 h-12">
            <Users className="h-5 w-5" />
            Alunos
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-4 text-white/70 hover:text-white hover:bg-white/10 h-12">
            <BarChart3 className="h-5 w-5" />
            Relatórios
          </Button>
          <div className="pt-8 border-t border-white/10 mt-8">
            <Button variant="ghost" className="w-full justify-start gap-4 text-white/70 hover:text-white hover:bg-white/10 h-12">
              <Settings className="h-5 w-5" />
              Configurações
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl text-secondary mb-2 font-serif italic">Gerenciar Aula e Conteúdo</h1>
            <p className="text-muted-foreground">Adicione, edite e organize suas masterclasses culinárias.</p>
          </div>
          
          <Button className="bg-accent text-secondary hover:bg-accent/90 h-12 px-6 font-bold flex gap-2">
            <Plus className="h-5 w-5" /> Nova Receita
          </Button>
        </header>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-4">Total de Alunos</p>
            <h3 className="text-4xl font-serif text-secondary">5,516</h3>
            <p className="text-xs text-green-600 mt-2 font-bold">+12% este mês</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-4">Avaliação Média</p>
            <h3 className="text-4xl font-serif text-secondary">4.92</h3>
            <div className="flex gap-1 mt-2">
               {[1,2,3,4,5].map(s => <div key={s} className="h-1 w-4 bg-accent rounded-full"></div>)}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-4">Receitas Ativas</p>
            <h3 className="text-4xl font-serif text-secondary">18</h3>
            <p className="text-xs text-secondary/60 mt-2">3 rascunhos em progresso</p>
          </div>
        </div>

        {/* Recipe Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center">
            <h2 className="text-2xl font-serif italic text-secondary">Lista de Receitas</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Filtrar receitas..." className="pl-9 pr-4 h-10 border rounded-lg text-sm w-64 bg-slate-50 focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
          
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 bg-opacity-50 text-muted-foreground uppercase text-[10px] tracking-widest font-bold">
                <th className="px-8 py-4">Receita</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Alunos</th>
                <th className="px-8 py-4">Avaliação</th>
                <th className="px-8 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MANAGE_RECIPES.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-secondary text-lg">{recipe.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Editado há 2 dias</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      recipe.status === "Publicado" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {recipe.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-secondary/80">
                    {recipe.students.toLocaleString()}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-secondary">
                      <Star className={`h-4 w-4 ${recipe.rating > 0 ? "fill-accent text-accent" : "text-slate-200"}`} />
                      {recipe.rating > 0 ? recipe.rating : "—"}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"><Eye className="h-4 w-4" /></Button>
                       <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-secondary/10 hover:text-secondary"><Edit2 className="h-4 w-4" /></Button>
                       <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

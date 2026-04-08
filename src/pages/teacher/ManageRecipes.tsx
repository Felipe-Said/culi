import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  ChefHat,
  Eye,
  LayoutDashboard,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Users,
  Utensils,
} from 'lucide-react'

type TeacherSection = 'overview' | 'recipes' | 'students' | 'reports' | 'settings'
type RecipeStatus = 'Publicado' | 'Rascunho'

type Recipe = {
  id: number
  title: string
  status: RecipeStatus
  students: number
  rating: number
  category: string
  duration: string
  updatedAt: string
}

type Student = {
  id: number
  name: string
  email: string
  progress: number
  favoriteRecipe: string
  cohort: string
}

const INITIAL_RECIPES: Recipe[] = [
  { id: 1, title: 'Tagliatelle al Ragu Bolognese', status: 'Publicado', students: 1240, rating: 4.9, category: 'Massas', duration: '3h 30m', updatedAt: 'Hoje, 09:20' },
  { id: 2, title: 'Risotto ai Funghi Porcini', status: 'Publicado', students: 856, rating: 4.8, category: 'Risotos', duration: '45m', updatedAt: 'Ontem, 18:40' },
  { id: 3, title: 'Pizza Margherita Napoletana', status: 'Publicado', students: 3420, rating: 4.9, category: 'Pizzas', duration: '24h', updatedAt: 'Ontem, 08:10' },
  { id: 4, title: 'Ossobuco alla Milanese', status: 'Rascunho', students: 0, rating: 0, category: 'Carnes', duration: '2h 20m', updatedAt: '05 abr, 14:30' },
]

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Helena Costa', email: 'helena@culi.com', progress: 92, favoriteRecipe: 'Tagliatelle al Ragu Bolognese', cohort: 'Turma Primavera' },
  { id: 2, name: 'Lucas Farias', email: 'lucas@culi.com', progress: 74, favoriteRecipe: 'Pizza Margherita Napoletana', cohort: 'Turma Noturna' },
  { id: 3, name: 'Marina Rocha', email: 'marina@culi.com', progress: 58, favoriteRecipe: 'Risotto ai Funghi Porcini', cohort: 'Turma Primavera' },
  { id: 4, name: 'Bruno Esteves', email: 'bruno@culi.com', progress: 33, favoriteRecipe: 'Ossobuco alla Milanese', cohort: 'Turma Intensiva' },
]

const SECTION_ITEMS: Array<{ id: TeacherSection; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'overview', label: 'Visao Geral', icon: LayoutDashboard },
  { id: 'recipes', label: 'Gerenciar Receitas', icon: Utensils },
  { id: 'students', label: 'Alunos', icon: Users },
  { id: 'reports', label: 'Relatorios', icon: BarChart3 },
  { id: 'settings', label: 'Configuracoes', icon: Settings },
]

function formatRating(rating: number) {
  return rating > 0 ? rating.toFixed(1) : 'Nova'
}

export default function ManageRecipes() {
  const [activeSection, setActiveSection] = useState<TeacherSection>('recipes')
  const [recipes, setRecipes] = useState(INITIAL_RECIPES)
  const [students] = useState(INITIAL_STUDENTS)
  const [recipeSearch, setRecipeSearch] = useState('')
  const [studentSearch, setStudentSearch] = useState('')
  const [selectedRecipeId, setSelectedRecipeId] = useState<number>(INITIAL_RECIPES[0].id)
  const [recipeDraft, setRecipeDraft] = useState<Recipe>(INITIAL_RECIPES[0])
  const [reportRange, setReportRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [settings, setSettings] = useState({
    schoolName: 'Piatto d Oro Academy',
    supportEmail: 'suporte@culi.com',
    autoPublish: false,
    enrollmentOpen: true,
  })
  const [feedback, setFeedback] = useState('')

  const filteredRecipes = useMemo(() => {
    const term = recipeSearch.toLowerCase().trim()
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term) ||
      recipe.category.toLowerCase().includes(term) ||
      recipe.status.toLowerCase().includes(term),
    )
  }, [recipeSearch, recipes])

  const filteredStudents = useMemo(() => {
    const term = studentSearch.toLowerCase().trim()
    return students.filter((student) =>
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.cohort.toLowerCase().includes(term),
    )
  }, [studentSearch, students])

  const publishedRecipes = recipes.filter((recipe) => recipe.status === 'Publicado').length
  const totalStudents = recipes.reduce((acc, recipe) => acc + recipe.students, 0)
  const ratedRecipes = recipes.filter((recipe) => recipe.rating > 0)
  const averageRating = ratedRecipes.reduce((acc, recipe) => acc + recipe.rating, 0) / ratedRecipes.length

  function loadRecipe(recipe: Recipe) {
    setSelectedRecipeId(recipe.id)
    setRecipeDraft(recipe)
    setActiveSection('recipes')
    setFeedback(`Editando "${recipe.title}".`)
  }

  function handleRecipeDraftChange<K extends keyof Recipe>(field: K, value: Recipe[K]) {
    setRecipeDraft((current) => ({ ...current, [field]: value }))
  }

  function handleCreateRecipe() {
    const nextRecipe: Recipe = {
      id: Date.now(),
      title: 'Nova receita italiana',
      status: 'Rascunho',
      students: 0,
      rating: 0,
      category: 'Nova categoria',
      duration: '1h 00m',
      updatedAt: 'Agora',
    }

    setRecipes((current) => [nextRecipe, ...current])
    setSelectedRecipeId(nextRecipe.id)
    setRecipeDraft(nextRecipe)
    setActiveSection('recipes')
    setFeedback('Nova receita criada. Preencha os campos e salve quando terminar.')
  }

  function handleSaveRecipe() {
    const updatedRecipe = {
      ...recipeDraft,
      title: recipeDraft.title.trim() || 'Receita sem titulo',
      category: recipeDraft.category.trim() || 'Sem categoria',
      duration: recipeDraft.duration.trim() || 'Sem duracao',
      updatedAt: 'Agora',
    }

    setRecipes((current) => current.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)))
    setRecipeDraft(updatedRecipe)
    setFeedback(`Receita "${updatedRecipe.title}" salva com sucesso.`)
  }

  function handleDeleteRecipe(id: number) {
    const remaining = recipes.filter((recipe) => recipe.id !== id)
    if (remaining.length === recipes.length) return

    setRecipes(remaining)
    if (remaining[0]) {
      setSelectedRecipeId(remaining[0].id)
      setRecipeDraft(remaining[0])
      setFeedback(`Receita removida. Agora exibindo "${remaining[0].title}".`)
      return
    }

    const emptyRecipe: Recipe = {
      id: Date.now(),
      title: '',
      status: 'Rascunho',
      students: 0,
      rating: 0,
      category: '',
      duration: '',
      updatedAt: 'Agora',
    }

    setSelectedRecipeId(emptyRecipe.id)
    setRecipeDraft(emptyRecipe)
    setFeedback('Todas as receitas foram removidas. Crie uma nova para continuar.')
  }

  function handleSaveSettings() {
    setFeedback('Configuracoes salvas localmente no painel do professor.')
  }

  const topRecipes = [...recipes].sort((a, b) => b.students - a.students).slice(0, 3)
  const reportData = {
    '7d': { revenue: 'R$ 4.800', retention: '78%', classes: '12 aulas' },
    '30d': { revenue: 'R$ 18.900', retention: '84%', classes: '39 aulas' },
    '90d': { revenue: 'R$ 54.600', retention: '88%', classes: '110 aulas' },
  }[reportRange]

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="bg-secondary text-white lg:w-72 lg:min-h-screen lg:sticky lg:top-0 p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-8 lg:mb-12">
          <ChefHat className="h-8 w-8 text-white" />
          <span className="text-2xl font-serif italic text-white">Maestro Panel</span>
        </div>

        <nav className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:space-y-2">
          {SECTION_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveSection(item.id)}
                className={`h-12 justify-start gap-4 rounded-2xl px-4 text-left ${
                  isActive ? 'bg-white/10 text-accent hover:bg-white/10' : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="whitespace-normal">{item.label}</span>
              </Button>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-10">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl text-secondary mb-2 font-serif italic">Painel do Professor</h1>
            <p className="text-muted-foreground">Administre aulas, acompanhe alunos e ajuste a operacao da escola.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleCreateRecipe} className="bg-accent text-secondary hover:bg-accent/90 h-12 px-6 font-bold">
              <Plus className="mr-2 h-5 w-5" />
              Nova Receita
            </Button>
            <Button variant="outline" onClick={handleSaveRecipe} className="h-12 px-6 border-secondary/20 text-secondary hover:bg-secondary/5">
              <Save className="mr-2 h-5 w-5" />
              Salvar Alteracoes
            </Button>
          </div>
        </header>

        {feedback ? (
          <div className="mb-8 rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm text-secondary shadow-sm">
            {feedback}
          </div>
        ) : null}

        {activeSection === 'overview' ? (
          <section className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <p className="text-sm font-medium text-muted-foreground mb-3">Receitas publicadas</p>
                <h2 className="text-4xl text-secondary">{publishedRecipes}</h2>
                <p className="mt-2 text-sm text-secondary/70">{recipes.length - publishedRecipes} em rascunho</p>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <p className="text-sm font-medium text-muted-foreground mb-3">Alunos ativos</p>
                <h2 className="text-4xl text-secondary">{totalStudents.toLocaleString('pt-BR')}</h2>
                <p className="mt-2 text-sm text-green-700">+12% nas ultimas 4 semanas</p>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <p className="text-sm font-medium text-muted-foreground mb-3">Avaliacao media</p>
                <h2 className="text-4xl text-secondary">{averageRating.toFixed(2)}</h2>
                <p className="mt-2 text-sm text-secondary/70">Baseado em {publishedRecipes} cursos publicados</p>
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <h3 className="text-2xl text-secondary mb-6">Receitas com melhor desempenho</h3>
                <div className="space-y-4">
                  {topRecipes.map((recipe, index) => (
                    <button key={recipe.id} onClick={() => loadRecipe(recipe)} className="flex w-full items-center justify-between rounded-2xl border border-slate-100 px-5 py-4 text-left transition hover:border-accent/40 hover:bg-accent/5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Top {index + 1}</p>
                        <p className="mt-2 font-semibold text-secondary">{recipe.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary">{recipe.students.toLocaleString('pt-BR')}</p>
                        <p className="text-sm text-muted-foreground">alunos</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <h3 className="text-2xl text-secondary mb-6">Checklist rapido</h3>
                <div className="space-y-4">
                  {[
                    'Publicar pelo menos 1 nova aula esta semana',
                    'Responder alunos com progresso abaixo de 40%',
                    'Revisar metricas de cancelamento mensal',
                  ].map((task) => (
                    <label key={task} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-secondary">
                      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
                      <span>{task}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activeSection === 'recipes' ? (
          <section className="grid gap-8 xl:grid-cols-[1.15fr,0.85fr]">
            <div className="rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              <div className="border-b p-6 lg:p-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl text-secondary">Gerenciar Receitas</h2>
                  <p className="text-sm text-muted-foreground mt-1">Clique em uma receita para editar os dados ao lado.</p>
                </div>

                <label className="relative block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={recipeSearch}
                    onChange={(event) => setRecipeSearch(event.target.value)}
                    type="text"
                    placeholder="Buscar por nome, categoria ou status"
                    className="h-11 w-full rounded-xl border bg-slate-50 pl-9 pr-4 text-sm outline-none ring-0 transition focus:border-secondary/20 focus:bg-white lg:w-80"
                  />
                </label>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredRecipes.map((recipe) => (
                  <button key={recipe.id} onClick={() => loadRecipe(recipe)} className={`grid w-full gap-4 px-6 py-5 text-left transition lg:grid-cols-[1.4fr,0.6fr,0.4fr,auto] lg:items-center ${recipe.id === selectedRecipeId ? 'bg-accent/10' : 'hover:bg-slate-50'}`}>
                    <div>
                      <p className="font-semibold text-secondary">{recipe.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{recipe.category} • atualizado {recipe.updatedAt}</p>
                    </div>
                    <div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${recipe.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {recipe.status}
                      </span>
                    </div>
                    <div className="text-sm text-secondary/75">{recipe.students.toLocaleString('pt-BR')} alunos</div>
                    <div className="text-sm font-semibold text-secondary">{formatRating(recipe.rating)}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm border border-slate-100">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl text-secondary">Editor da Receita</h3>
                  <p className="text-sm text-muted-foreground mt-1">Atualize as informacoes principais do curso.</p>
                </div>
                <Button variant="ghost" onClick={() => setActiveSection('overview')} className="text-secondary hover:bg-secondary/5">
                  <Eye className="mr-2 h-4 w-4" />
                  Visao geral
                </Button>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-secondary">Titulo</span>
                  <input value={recipeDraft.title} onChange={(event) => handleRecipeDraftChange('title', event.target.value)} className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white" />
                </label>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-secondary">Categoria</span>
                    <input value={recipeDraft.category} onChange={(event) => handleRecipeDraftChange('category', event.target.value)} className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white" />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-secondary">Duracao</span>
                    <input value={recipeDraft.duration} onChange={(event) => handleRecipeDraftChange('duration', event.target.value)} className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white" />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-secondary">Status</span>
                    <select value={recipeDraft.status} onChange={(event) => handleRecipeDraftChange('status', event.target.value as RecipeStatus)} className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white">
                      <option value="Publicado">Publicado</option>
                      <option value="Rascunho">Rascunho</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-secondary">Alunos inscritos</span>
                    <input value={recipeDraft.students} onChange={(event) => handleRecipeDraftChange('students', Number(event.target.value || 0))} type="number" min="0" className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white" />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-secondary">Nota media</span>
                  <input value={recipeDraft.rating} onChange={(event) => handleRecipeDraftChange('rating', Number(event.target.value || 0))} type="number" min="0" max="5" step="0.1" className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white" />
                </label>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button onClick={handleSaveRecipe} className="bg-secondary text-white hover:bg-secondary/90">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar receita
                  </Button>
                  <Button variant="outline" onClick={() => handleDeleteRecipe(recipeDraft.id)} className="border-destructive/20 text-destructive hover:bg-destructive/5">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activeSection === 'students' ? (
          <section className="space-y-8">
            <div className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl text-secondary">Alunos</h2>
                  <p className="text-sm text-muted-foreground mt-1">Acompanhe engajamento e progresso da sua comunidade.</p>
                </div>

                <label className="relative block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input value={studentSearch} onChange={(event) => setStudentSearch(event.target.value)} type="text" placeholder="Buscar aluno ou turma" className="h-11 w-full rounded-xl border bg-slate-50 pl-9 pr-4 text-sm outline-none transition focus:border-secondary/20 focus:bg-white lg:w-80" />
                </label>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              {filteredStudents.map((student) => (
                <article key={student.id} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl text-secondary">{student.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{student.email}</p>
                    </div>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">{student.cohort}</span>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progresso geral</span>
                      <span className="font-semibold text-secondary">{student.progress}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div className="h-3 rounded-full bg-secondary" style={{ width: `${student.progress}%` }} />
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-secondary">
                    Receita favorita: <span className="font-semibold">{student.favoriteRecipe}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeSection === 'reports' ? (
          <section className="space-y-8">
            <div className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl text-secondary">Relatorios</h2>
                  <p className="text-sm text-muted-foreground mt-1">Compare desempenho academico e comercial do painel.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: '7d', label: '7 dias' },
                    { id: '30d', label: '30 dias' },
                    { id: '90d', label: '90 dias' },
                  ].map((option) => (
                    <Button key={option.id} variant="ghost" onClick={() => setReportRange(option.id as '7d' | '30d' | '90d')} className={`rounded-full px-4 ${reportRange === option.id ? 'bg-secondary text-white hover:bg-secondary' : 'bg-slate-100 text-secondary hover:bg-slate-200'}`}>
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <p className="text-sm text-muted-foreground mb-3">Receita gerada</p>
                <h3 className="text-4xl text-secondary">{reportData.revenue}</h3>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <p className="text-sm text-muted-foreground mb-3">Retencao media</p>
                <h3 className="text-4xl text-secondary">{reportData.retention}</h3>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <p className="text-sm text-muted-foreground mb-3">Carga ministrada</p>
                <h3 className="text-4xl text-secondary">{reportData.classes}</h3>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm border border-slate-100">
              <h3 className="text-2xl text-secondary mb-6">Cursos que mais convertem</h3>
              <div className="space-y-5">
                {topRecipes.map((recipe) => {
                  const width = Math.max(20, Math.min(100, Math.round(recipe.students / 40)))
                  return (
                    <div key={recipe.id}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-secondary">{recipe.title}</span>
                        <span className="text-muted-foreground">{recipe.students} alunos</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-100">
                        <div className="h-3 rounded-full bg-accent" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {activeSection === 'settings' ? (
          <section className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm border border-slate-100">
            <div className="mb-8">
              <h2 className="text-2xl text-secondary">Configuracoes</h2>
              <p className="text-sm text-muted-foreground mt-1">Atualize informacoes operacionais do ambiente do professor.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-secondary">Nome da escola</span>
                <input value={settings.schoolName} onChange={(event) => setSettings((current) => ({ ...current, schoolName: event.target.value }))} className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white" />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-secondary">Email de suporte</span>
                <input value={settings.supportEmail} onChange={(event) => setSettings((current) => ({ ...current, supportEmail: event.target.value }))} className="h-12 w-full rounded-xl border bg-slate-50 px-4 outline-none transition focus:border-secondary/20 focus:bg-white" />
              </label>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4 text-secondary">
                <div>
                  <p className="font-medium">Publicacao automatica</p>
                  <p className="text-sm text-muted-foreground">Publica cursos marcados como prontos.</p>
                </div>
                <input type="checkbox" checked={settings.autoPublish} onChange={(event) => setSettings((current) => ({ ...current, autoPublish: event.target.checked }))} className="h-5 w-5 rounded border-slate-300" />
              </label>

              <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4 text-secondary">
                <div>
                  <p className="font-medium">Matriculas abertas</p>
                  <p className="text-sm text-muted-foreground">Permite novas inscricoes imediatamente.</p>
                </div>
                <input type="checkbox" checked={settings.enrollmentOpen} onChange={(event) => setSettings((current) => ({ ...current, enrollmentOpen: event.target.checked }))} className="h-5 w-5 rounded border-slate-300" />
              </label>
            </div>

            <div className="mt-8">
              <Button onClick={handleSaveSettings} className="bg-secondary text-white hover:bg-secondary/90">
                <Save className="mr-2 h-4 w-4" />
                Salvar configuracoes
              </Button>
            </div>
          </section>
        ) : null}

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-muted-foreground">Modulo ativo</p>
            <p className="mt-2 font-semibold text-secondary">{SECTION_ITEMS.find((section) => section.id === activeSection)?.label}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-muted-foreground">Cursos no catalogo</p>
            <p className="mt-2 font-semibold text-secondary">{recipes.length}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="text-sm text-muted-foreground">Alunos mapeados</p>
            <p className="mt-2 font-semibold text-secondary">{students.length}</p>
          </div>
        </section>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { ChefHat, AlertCircle } from 'lucide-react'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (email === 'student@piattodoro.com' && password === 'student123') {
      navigate('/dashboard')
    } else if (email === 'teacher@piattodoro.com' && password === 'teacher123') {
      navigate('/teacher')
    } else {
      setError('Credenciais inválidas. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-primary/10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <ChefHat className="h-10 w-10 text-primary" />
            <span className="text-3xl font-serif italic text-primary">Piatto d'Oro</span>
          </Link>
          <h2 className="text-3xl font-serif text-secondary mb-2">Benvenuto!</h2>
          <p className="text-muted-foreground">Acesse sua jornada culinária exclusiva.</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 text-destructive text-sm">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              placeholder="chef@piattodoro.com" 
              className="w-full h-12 px-4 rounded-xl border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-12 px-4 rounded-xl border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full h-12 bg-primary text-white text-lg">Entrar</Button>
        </form>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Ainda não é um aluno? <a href="#" className="text-primary font-bold hover:underline">Inscreva-se agora</a>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl text-xs space-y-2">
          <p className="font-bold text-muted-foreground uppercase">Demonstração:</p>
          <p>🎓 <strong>Aluno:</strong> student@piattodoro.com / student123</p>
          <p>👨‍🍳 <strong>Professor:</strong> teacher@piattodoro.com / teacher123</p>
        </div>
      </div>
    </div>
  )
}

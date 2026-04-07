import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { BookOpen, UserCheck, PlayCircle, Star, ChefHat } from 'lucide-react'
import { motion } from 'framer-motion'

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b">
        <div className="container flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-serif italic text-primary">Piatto d'Oro</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#courses" className="hover:text-primary transition-colors">Cursos</a>
            <a href="#about" className="hover:text-primary transition-colors">A Escola</a>
            <a href="#tutorials" className="hover:text-primary transition-colors">Tutoriais</a>
            <Link to="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Entrar
              </Button>
            </Link>
            <Button className="bg-primary text-white">Começar Agora</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.png" 
            alt="Authentic Italian Pasta" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-6xl md:text-8xl mb-6">A Arte da Culinária Italiana em sua Casa.</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 font-light leading-relaxed">
              Descubra os segredos dos mestres chefs da Itália através de uma jornada sensorial única. 
              Receitas artesanais, técnicas milenares e o prazer de cozinhar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8">
                Ver Catálogo de Receitas
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 text-lg h-14 px-8">
                Painel do Aluno
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="courses" className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl mb-4 text-primary">Excelência em Cada Detalhe</h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Nossa plataforma foi desenhada para proporcionar a melhor experiência de aprendizado, 
              focada na técnica e na paixão pela gastronomia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: PlayCircle, 
                title: "Tutoriais em 4K", 
                desc: "Aulas detalhadas em alta definição com múltiplos ângulos para você não perder nenhum detalhe." 
              },
              { 
                icon: BookOpen, 
                title: "E-books de Receitas", 
                desc: "Material didático exclusivo com história, ingredientes e técnicas de cada prato." 
              },
              { 
                icon: UserCheck, 
                title: "Mentoria de Chefs", 
                desc: "Dúvidas respondidas diretamente pelos nossos mestres culinários italianos." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white shadow-xl shadow-primary/5 border border-primary/10 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl mb-4 text-secondary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="py-24 bg-secondary/5">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
                <img 
                  src="/hero.png" 
                  alt="Pasta preparation" 
                  className="rounded-2xl shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 p-6 glass rounded-xl shadow-lg relative z-20">
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 fill-accent text-accent" />)}
                    </div>
                    <span className="font-bold">+5.000 Alunos</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl mb-6 text-primary">Mestre da Massa Fresca</h2>
              <p className="text-xl text-muted-foreground mb-8 italic">"A alma da cozinha italiana está na ponta dos dedos e no coração de quem cozinha."</p>
              <ul className="space-y-4 mb-10">
                {[
                  "Segredos da Farinha 00 e Sêmola",
                  "Técnicas de Amassamento Manual",
                  "Cortes Clássicos: Tagliatelle, Pappardelle, Farfalle",
                  "Molhos Autênticos: Carbonara, Amatriciana, Pesto Genovese"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white h-14 px-10">
                Começar Este Módulo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16">
        <div className="container grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <ChefHat className="h-8 w-8 text-white" />
              <span className="text-3xl font-serif italic">Piatto d'Oro</span>
            </div>
            <p className="text-white/60 max-w-sm mb-8">
              Levando a essência da culinária italiana para todos os cantos do mundo. 
              Sabor, técnica e paixão em cada aula.
            </p>
          </div>
          <div>
            <h4 className="text-xl mb-6 not-italic font-bold">Links Úteis</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seja um Instrutor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl mb-6 not-italic font-bold">Newsletter</h4>
            <p className="text-white/60 mb-4">Receba receitas gratuitas toda semana.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Seu email" className="bg-white/10 border-white/20 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-accent" />
              <Button className="bg-accent text-secondary hover:bg-accent/90">OK</Button>
            </div>
          </div>
        </div>
        <div className="container border-t border-white/10 mt-16 pt-8 text-center text-white/40 text-sm">
          © 2026 Piatto d'Oro. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  )
}

export type Recipe = {
  id: number
  title: string
  description: string
  time: string
  difficulty: string
  rating: number
  category: string
  image: string
  heroImage?: string
  servings: number
  ingredients: string[]
  steps: Array<{ title: string; desc: string }>
}

export const RECIPES: Recipe[] = [
  {
    id: 1,
    title: 'Tagliatelle al Ragu Bolognese',
    description:
      'O autentico molho bolonhes pede tempo, paciencia e tecnica. Aprenda a versao tradicional da Emilia-Romagna.',
    time: '3h 30m',
    difficulty: 'Medio',
    rating: 4.9,
    category: 'Massas',
    image:
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=1600',
    servings: 4,
    ingredients: [
      '500g de tagliatelle fresco ao ovo',
      '300g de carne bovina moida',
      '150g de carne suina moida',
      '50g de manteiga sem sal',
      '1 cebola pequena picada',
      '1 cenoura pequena picada',
      '1 talo de aipo picado',
      '1/2 copo de vinho branco seco',
      '2 colheres de sopa de extrato de tomate',
      '1 copo de leite integral',
      'Sal e pimenta-do-reino a gosto',
    ],
    steps: [
      {
        title: 'Prepare o soffritto',
        desc: 'Derreta a manteiga e refogue cebola, cenoura e aipo em fogo baixo ate ficarem macios.',
      },
      {
        title: 'Sele as carnes',
        desc: 'Adicione as carnes, aumente o fogo e cozinhe ate a agua evaporar e a mistura dourar.',
      },
      {
        title: 'Deglaceie com vinho',
        desc: 'Despeje o vinho branco e deixe reduzir completamente para concentrar o sabor.',
      },
      {
        title: 'Cozinhe lentamente',
        desc: 'Junte o tomate e deixe em fogo minimo por 2 a 3 horas, ajustando com leite ou caldo se preciso.',
      },
    ],
  },
  {
    id: 2,
    title: 'Risotto ai Funghi Porcini',
    description:
      'Um risoto classico com textura cremosa, caldo bem trabalhado e finalizacao delicada com porcini.',
    time: '45m',
    difficulty: 'Dificil',
    rating: 4.8,
    category: 'Arroz',
    image:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1600',
    servings: 2,
    ingredients: [
      '250g de arroz arboreo',
      '30g de funghi porcini seco',
      '1 litro de caldo de legumes',
      '1/2 cebola picada',
      '80ml de vinho branco seco',
      '40g de manteiga gelada',
      '50g de parmesao ralado',
      'Azeite, sal e pimenta-do-reino',
    ],
    steps: [
      {
        title: 'Hidrate o funghi',
        desc: 'Cubra o porcini com agua morna por 20 minutos e reserve o liquido coado.',
      },
      {
        title: 'Toste o arroz',
        desc: 'Refogue a cebola, acrescente o arroz e mexa ate os graos ficarem brilhantes.',
      },
      {
        title: 'Cozinhe por etapas',
        desc: 'Entre com vinho e depois adicione o caldo aos poucos, mexendo sempre.',
      },
      {
        title: 'Finalize',
        desc: 'Misture porcini, manteiga e parmesao fora do fogo para emulsionar.',
      },
    ],
  },
  {
    id: 3,
    title: 'Tiramisu Classico',
    description:
      'Camadas suaves de mascarpone, cafe e cacau em um classico italiano servido bem gelado.',
    time: '30m',
    difficulty: 'Facil',
    rating: 5,
    category: 'Sobremesas',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=1600',
    servings: 6,
    ingredients: [
      '300g de mascarpone',
      '3 gemas',
      '80g de acucar',
      '200ml de cafe forte',
      '200g de biscoito champagne',
      'Cacau em po para finalizar',
    ],
    steps: [
      {
        title: 'Prepare o creme',
        desc: 'Bata gemas e acucar ate formar um creme claro e incorpore o mascarpone.',
      },
      {
        title: 'Monte as camadas',
        desc: 'Passe os biscoitos rapidamente no cafe e alterne com o creme.',
      },
      {
        title: 'Gele',
        desc: 'Leve para a geladeira por no minimo 4 horas antes de servir com cacau.',
      },
    ],
  },
  {
    id: 4,
    title: 'Pizza Margherita Napoletana',
    description:
      'Fermentacao longa, borda aerada e equilibrio entre molho, mozzarella e manjericao fresco.',
    time: '24h (Fermentacao)',
    difficulty: 'Mestre',
    rating: 4.9,
    category: 'Pizzas',
    image: '/hero.png',
    heroImage: '/hero.png',
    servings: 2,
    ingredients: [
      '500g de farinha tipo 00',
      '325ml de agua',
      '2g de fermento biologico seco',
      '12g de sal',
      '200g de molho de tomate',
      '250g de mozzarella fior di latte',
      'Folhas de manjericao e azeite',
    ],
    steps: [
      {
        title: 'Misture e sove',
        desc: 'Combine farinha, agua, fermento e sal ate obter uma massa lisa e elastica.',
      },
      {
        title: 'Fermente',
        desc: 'Deixe descansar por 18 a 24 horas para ganhar leveza e sabor.',
      },
      {
        title: 'Abra e cubra',
        desc: 'Modele o disco manualmente e distribua molho, queijo e manjericao.',
      },
      {
        title: 'Asse em alta temperatura',
        desc: 'Leve ao forno ou pedra bem quente ate formar borda inflada e dourada.',
      },
    ],
  },
]

export const CATEGORIES = ['Tudo', 'Massas', 'Arroz', 'Pizzas', 'Carnes', 'Peixes', 'Sobremesas']

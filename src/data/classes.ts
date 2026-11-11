import { CharacterClassDefinition } from '@/types';

export const CLASSES_DOCE_NEGOCIO: CharacterClassDefinition[] = [
  {
    id: 'estrategista',
    nome: 'A Estrategista',
    descricao: 'Você acompanha os recursos do negócio, cuida do planejamento e orienta as principais decisões da confeitaria.',
    contribuicao: 'Gestão, contas e planejamento',
    atributoChave: 'int',
    habilidadeNome: 'Visão Estratégica',
    habilidadeDescricao: '+3 em uma perícia de um aliado por rodada (ex: ajuda na precificação, negociação ou adaptação).',
    icone: 'Brain',
    fraseResiliencia: 'Organizar não é apenas alinhar papéis, é garantir o amanhã.',
    loreResiliencia: 'Transformou a necessidade em método: apaixonada por lógica e organização, é a bússola que não deixa o negócio perder o rumo.',
    fraseVisao: 'O perfeccionismo não é um detalhe, é o alicerce da excelência.',
    loreVisao: 'Absorveu a paixão por métricas e processos no ambiente familiar corporativo, transformando grandes ideias em resultados rentáveis.'
  },
  {
    id: 'artesao',
    nome: 'O Artesão dos Doces',
    descricao: 'Você entende de receitas tradicionais e sabe transformar ingredientes em belíssimos chocolates artesanais.',
    contribuicao: 'Produção, técnica e acabamento',
    atributoChave: 'des',
    habilidadeNome: 'Mãos de Ouro',
    habilidadeDescricao: 'Recupera uma produção perdida (1 vez por sessão, salva um lote que desandou ou queimou).',
    icone: 'ChefHat',
    fraseResiliencia: 'A terra ensina o tempo do fruto, as mãos dão a forma ao afeto.',
    loreResiliencia: 'Aprendeu na roça o tempo do cacau e nas cozinhas de suas tias os segredos da têmpera e dos doces de afeto.',
    fraseVisao: 'A alta gastronomia é a arte de encantar todos os sentidos pelo paladar.',
    loreVisao: 'Dominou cursos avançados de chocolateria fina, garantindo acabamento estético impecável e padrão gourmet superior.'
  },
  {
    id: 'bardo',
    nome: 'O Bardo dos Sabores',
    descricao: 'Você pensa em como apresentar o produto final, cria narrativas envolventes e conquista os clientes com simpatia e carisma.',
    contribuicao: 'Divulgação, atendimento e negociação',
    atributoChave: 'car',
    habilidadeNome: 'Encanto da Cacauicultura',
    habilidadeDescricao: '+4 REP (Reputação) se passar no teste de Publicidade / Diplomacia (CD 15).',
    icone: 'Sparkles',
    fraseResiliencia: 'Toda grande receita precisa de uma boa história para ser saboreada.',
    loreResiliencia: 'Carisma magnético e comunicação contagiante: faz qualquer cliente se apaixonar pela história do chocolate da equipe em minutos.',
    fraseVisao: 'A tradição constrói o passado, mas é a inovação que dita o futuro.',
    loreVisao: 'Especialista em presença digital, tendências visuais e redes sociais, tornando os doces do grupo o assunto do momento.'
  },
  {
    id: 'arquiteto',
    nome: 'O Arquiteto dos Caminhos do Cacau',
    descricao: 'Você cuida dos recursos, dos materiais, do estoque e garante que tudo chegue ao lugar certo e no prazo certo.',
    contribuicao: 'Estoque, fornecedores e entregas',
    atributoChave: 'con',
    habilidadeNome: 'Rotas Certeiras',
    habilidadeDescricao: '+2 em Logística por rodada (facilita compras emergenciais, prazos apertados e transporte).',
    icone: 'Truck',
    fraseResiliencia: 'Transformo o peso da caminhada em ritmo, inspiração e solução.',
    loreResiliencia: 'Trabalhador incansável e leal, equilibra a dureza da rotina com agilidade física e raciocínio prático de entregas.',
    fraseVisao: 'A verdadeira estabilidade se constrói com trabalho, visão e estrutura.',
    loreVisao: 'Bagagem prática de escala e fornecedores, antecipando gargalos e garantindo que nunca falte insumo na cozinha.'
  },
  {
    id: 'guardia',
    nome: 'A Guardiã',
    descricao: 'Você pensa nas finanças com responsabilidade, mantém os pés no chão e protege o negócio de impulsos e prejuízos.',
    contribuicao: 'Avaliação de riscos e decisões de custo',
    atributoChave: 'sab',
    habilidadeNome: 'Escudo Financeiro',
    habilidadeDescricao: 'Reduz qualquer perda financeira em 15% (calculado sobre prejuízos ou custos imprevistos).',
    icone: 'ShieldCheck',
    fraseResiliencia: 'A alegria nos impulsiona, mas a consciência mantém os pés no chão.',
    loreResiliencia: 'Espontânea e acolhedora, mas dona de um olhar crítico afiado: guia o grupo sempre perguntando "até que ponto isso vale a pena?".',
    fraseVisao: 'O verdadeiro valor das coisas está no equilíbrio, não no excesso.',
    loreVisao: 'Maturidade ímpar e rigor financeiro que protege o capital de giro e previne despesas desnecessárias.'
  }
];

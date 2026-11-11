import { CharacterClassDefinition } from '@/types';

export const CLASSES_DOCE_NEGOCIO: CharacterClassDefinition[] = [
  {
    id: 'estrategista',
    nome: 'A Estrategista',
    descricao: 'Você acompanha os recursos do negócio e ajuda nas decisões.',
    contribuicao: 'Gestão, contas e planejamento',
    atributoChave: 'int',
    habilidadeNome: 'Visão Estratégica',
    habilidadeDescricao: '+3 em uma perícia de um aliado por rodada (ex: ajuda na precificação, negociação ou adaptação).',
    icone: 'Brain',
    fraseResiliencia: 'Organizar não é apenas alinhar papéis, é garantir o amanhã.',
    loreResiliencia: 'Com apenas 21 anos, ela carrega nos olhos a determinação de quem deixou sua pequena cidade natal, uma terra histórica e marcada pelas memórias do cacau, para buscar o diploma universitário. Morando de aluguel na cidade vizinha ao campus, transformou a necessidade em método: é apaixonada (obcecada, talvez?) por lógica e organização. Enquanto administra o orçamento da própria casa, calcula meticulosamente as finanças da família à distância, encontrando soluções onde outros só veem aperto. No grupo, ela é a bússola e a mente analítica que não deixa o negócio perder o rumo.',
    fraseVisao: 'O perfeccionismo não é um detalhe, é o alicerce da excelência.',
    loreVisao: 'Morando confortavelmente com a família, ela pode dedicar 100% do seu tempo ao universo acadêmico. Criada em um ambiente familiar fortemente ligado à gestão e ao ramo administrativo, absorveu desde cedo a paixão pela métrica, pelo planejamento e pela precisão. Embora nunca tenha enfrentado privações financeiras, direcionou sua energia para se tornar uma analista perfeccionista e obcecada por organização (e por doces). No negócio, ela traz a visão corporativa necessária para transformar ideias em processos rentáveis.'
  },
  {
    id: 'artesao',
    nome: 'O Artesão dos Doces',
    descricao: 'Você entende de receitas e sabe transformar ingredientes em belíssimos chocolates.',
    contribuicao: 'Produção, técnica e acabamento',
    atributoChave: 'des',
    habilidadeNome: 'Mãos de Ouro',
    habilidadeDescricao: 'Recupera uma produção perdida (1 vez por sessão, salva um lote que desandou ou queimou).',
    icone: 'ChefHat',
    fraseResiliencia: 'A terra ensina o tempo do fruto, as mãos dão a forma ao afeto.',
    loreResiliencia: 'Crescido no interior, ele traz no sangue o respeito pelo campo e a sabedoria da terra. Desde pequeno, aprendeu na roça os segredos do plantio, da colheita e do valor dos produtos orgânicos. Foi na cozinha de suas tias, entre aromas e panelas, que descobriu o amor pela feitura dos doces. Hoje, morando sozinho longe da família, ele divide seu tempo entre o trabalho duro e as aulas na universidade. Dono de uma inteligência prática e de um esforço inabalável, ele transforma o cansaço em combustível para realizar o sonho de prosperar.',
    fraseVisao: 'A alta gastronomia é a arte de encantar todos os sentidos pelo paladar.',
    loreVisao: 'Vindo de uma família de produtores rurais com grandes propriedades no interior, ele decidiu buscar novos horizontes na vida urbana e ingressou em uma universidade de referência. Mas sua paixão não estava nos negócios do campo, e sim na transformação dos frutos. Investiu em cursos de confeitaria refinada e domina as técnicas com maestria. Ele não trabalha apenas com sabores, mas com a estética e a experiência do cliente, sabendo exatamente como conquistar o mercado pela sofisticação e pelo padrão de qualidade.'
  },
  {
    id: 'bardo',
    nome: 'O Bardo dos Sabores',
    descricao: 'Você pensa em como apresentar o produto final e conquistar clientes.',
    contribuicao: 'Divulgação, atendimento e negociação',
    atributoChave: 'car',
    habilidadeNome: 'Encanto da Cacauicultura',
    habilidadeDescricao: '+4 REP (Reputação) se passar no teste de Publicidade / Diplomacia (CD 15).',
    icone: 'Sparkles',
    fraseResiliencia: 'Toda grande receita precisa de uma boa história para ser saboreada.',
    loreResiliencia: 'Nativo da cidade vizinha à universidade, aos 22 anos ele traz na bagagem a vivência de quem já rodou pela região e conheceu de tudo um pouco. Dono de um carisma magnético, uma simpatia contagiante e um humor leve, é o verdadeiro artista da equipe. Sua lábia é afiada e irresistível: ele enxerga poesia e valor no trabalho dos amigos e não descansa até convencer o mundo disso. Cuidado ao ouvi-lo falar, em questão de minutos, ele fará você se apaixonar pelo chocolate do grupo como se fosse a maior iguaria do planeta.',
    fraseVisao: 'A tradição constrói o passado, mas é a inovação que dita o futuro.',
    loreVisao: 'Espírito livre, mente inquieta e alma criativa. Apesar do desejo de seu pai, um rigoroso militar, de que seguisse a mesma carreira, ele rejeitou o caminho engessado e largou duas faculdades na área de tecnologia por não se prender a rotinas engessadas. Descontraído e antenado, ele é o especialista do grupo no mundo digital, ligado nas redes sociais, em tendências e no comportamento dos jovens consumidores. Com sua comunicação moderna e perspicácia visual, ele transforma o produto do grupo no assunto do momento.'
  },
  {
    id: 'arquiteto',
    nome: 'O Arquiteto dos Caminhos do Cacau',
    descricao: 'Você cuida dos recursos, dos materiais e de tudo que precisa chegar ao lugar certo.',
    contribuicao: 'Estoque, fornecedores e entregas',
    atributoChave: 'con',
    habilidadeNome: 'Rotas Certeiras',
    habilidadeDescricao: '+2 em Logística por rodada (facilita compras emergenciais, prazos apertados e transporte).',
    icone: 'Truck',
    fraseResiliencia: 'Transformo o peso da caminhada em ritmo, inspiração e solução.',
    loreResiliencia: 'Sua jornada é marcada pela resiliência. Saindo ainda criança do ritmo frenético de São Paulo, encontrou no acolhimento da Bahia o seu verdadeiro lar. Aos 24 anos, é o pilar de sua família e aprendeu a dar valor sagrado a cada pequena vitória. Trabalhador incansável, equilibra a dureza da rotina com um estilo único e autêntico que mescla inteligência afiada, crítica social e bom humor. Morando sozinho, recarrega suas energias nos raros momentos livres dedilhando notas na guitarra ou compondo rimas de rap. Na equipe, é a força motriz que mantém todos motivados.',
    fraseVisao: 'A verdadeira estabilidade se constrói com trabalho, visão e estrutura.',
    loreVisao: 'Após sua família mudar de estado para recomeçar seus empreendimentos na Bahia, ele rapidamente se adaptou ao calor e à cultura local com um senso de humor único. Criado no seio de uma família empreendedora, dona de uma reconhecida fábrica de artigos esportivos, ele aprendeu desde muito jovem a mecânica dos grandes negócios, da produção em escala e da responsabilidade comercial. Ele une a leveza de quem sabe curtir a vida com a seriedade de quem entende de logística e estratégia de mercado.'
  },
  {
    id: 'guardia',
    nome: 'A Guardiã',
    descricao: 'Você pensa nas finanças, as moedas estão contadas.',
    contribuicao: 'Avaliação de riscos e decisões de custo',
    atributoChave: 'sab',
    habilidadeNome: 'Escudo Financeiro',
    habilidadeDescricao: 'Reduz qualquer perda financeira em 15% (calculado sobre prejuízos ou custos imprevistos).',
    icone: 'ShieldCheck',
    fraseResiliencia: 'A alegria nos impulsiona, mas a consciência mantém os pés no chão.',
    loreResiliencia: 'Espontaneidade e energia viva a definem. Morava com a família em uma cidade vizinha até vir para a universidade, trazendo consigo uma alegria contagiante e uma comunicação sem filtros. Por trás de sua natureza falante e alto-astral, existe um olhar extremamente lúcido e pragmático. Sua filosofia guia o grupo com uma pergunta essencial: "Até que ponto isso realmente vale a pena?" É ela quem protege o negócio dos impulsos e garante que cada decisão seja tomada com pé no chão e responsabilidade.',
    fraseVisao: 'O verdadeiro valor das coisas está no equilíbrio, não no excesso.',
    loreVisao: 'Jovem sonhadora e radiante, ela traz a bagagem de uma criação pautada na ética e na estrutura. Filha de uma educadora e diretora escolar e de um empresário do ramo da construção civil, cresceu cercada de referências sobre gestão e educação. Apesar de sua vida financeira estável, desenvolveu uma maturidade ímpar: não se deixa iludir pelos excessos do consumo e é extremamente responsável com recursos. Com sua visão consciente e pés fincados na realidade, ela é a guardiã perfeita do patrimônio dos negócios.'
  }
];

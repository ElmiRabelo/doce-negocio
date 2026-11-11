import { GameCard } from '@/types';

export const CARTAS_DEMANDA_OFICIAIS: GameCard[] = [
  {
    id: 'demanda-1',
    numero: 1,
    tipo: 'demanda',
    titulo: 'Barraquinha na Feira Cultural',
    narrativa: 'No fim de semana haverá um grande evento cultural na feira da cidade de Ilhéus, com música regional e muitos visitantes. Vocês têm a oportunidade de montar uma barraquinha com os seus produtos e tentar vendê-los para o público.',
    efeitoRegra: 'A equipe decide quantos produtos levar. Cada venda pode render clientes fixos e aumentar a visibilidade.',
    testeSugerido: {
      pericia: 'Diplomacia',
      atributo: 'car',
      cd: 15
    },
    fonte: 'oficial'
  },
  {
    id: 'demanda-2',
    numero: 2,
    tipo: 'demanda',
    titulo: 'Lembrancinhas de Aniversário Infantil',
    narrativa: 'Uma mãe da vizinhança quer encomendar lembrancinhas doces para o aniversário de 5 anos do filho. Ela precisa de exatamente 50 unidades com embalagem simples e bonita, e quer um desconto pelo volume.',
    efeitoRegra: 'Volume alto (50 unidades). Requer conferir se há ingredientes e tempo de produção hábil antes do prazo.',
    testeSugerido: {
      pericia: 'Planejamento',
      atributo: 'int',
      cd: 15
    },
    fonte: 'oficial'
  },
  {
    id: 'demanda-3',
    numero: 3,
    tipo: 'demanda',
    titulo: 'Presente Especial para a Mãe',
    narrativa: 'Um jovem apaixonado quer surpreender a mãe com uma caixa requintada de doces artesanais finos. Ele está disposto a pagar bem se a apresentação for impecável e o acabamento for de primeira linha.',
    efeitoRegra: 'Cliente exigente no visual. Se o acabamento for excelente, gera +2 REP imediato.',
    testeSugerido: {
      pericia: 'Confeiteiro',
      atributo: 'des',
      cd: 15
    },
    fonte: 'oficial'
  },
  {
    id: 'demanda-4',
    numero: 4,
    tipo: 'demanda',
    titulo: 'Estabelecimentos da Cidade',
    narrativa: 'Uma cafeteria charmosa e um empório no centro histórico de Ilhéus têm interesse em expor doces artesanais de produtores locais para revenda consignada ou fornecimento semanal.',
    efeitoRegra: 'Negociação B2B (empresa para empresa). A margem de revenda precisa ser calculada com cuidado.',
    testeSugerido: {
      pericia: 'Administração',
      atributo: 'int',
      cd: 15
    },
    fonte: 'oficial'
  },
  {
    id: 'demanda-5',
    numero: 5,
    tipo: 'demanda',
    titulo: 'Venda de Verão na Praia',
    narrativa: 'Dia ensolarado com praias lotadas na orla sul de Ilhéus! Vocês separam produtos que aguentam bem a temperatura ambiente para vender diretamente aos banhistas e turistas em um cooler térmico.',
    efeitoRegra: 'Risco de calor excessivo derreter o chocolate se a logística demorar. Exige agilidade e abordagem simpática.',
    testeSugerido: {
      pericia: 'Agilidade',
      atributo: 'con',
      cd: 15
    },
    fonte: 'oficial'
  },
  {
    id: 'demanda-6',
    numero: 6,
    tipo: 'demanda',
    titulo: 'Encomenda Urgente de Última Hora',
    narrativa: 'Uma encomenda repentina surgiu de última hora: é para amanhã cedo, uma festa surpresa! Os organizadores precisam desesperadamente saber se vocês conseguem entregar 150 doces até as 15h00.',
    efeitoRegra: 'Prazo curtíssimo e pressão máxima. Se aceitar e entregar no prazo, cliente paga 20% acima do preço tabelado.',
    testeSugerido: {
      pericia: 'Logística',
      atributo: 'con',
      cd: 15
    },
    fonte: 'oficial'
  }
];

export const CARTAS_MONTE_MISTO_OFICIAIS: GameCard[] = [
  // 1-12 Obstáculos
  {
    id: 'obstaculo-1',
    numero: 1,
    tipo: 'obstaculo',
    titulo: 'Receita Errada',
    narrativa: 'Na pressa da produção, alguém trocou a proporção dos ingredientes ou esqueceu um item no fogo. A textura do lote desandou!',
    efeitoRegra: 'Perda do lote atual, a menos que o Artesão use sua habilidade ou a equipe passe em teste para adaptar.',
    testeSugerido: { pericia: 'Fabricar', atributo: 'des', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-2',
    numero: 2,
    tipo: 'obstaculo',
    titulo: 'Equipamento Quebrado',
    narrativa: 'A sua batedeira foi parando aos poucos, fez um barulho estranho e ainda saiu um fio de fumaça: a batedeira já era!',
    efeitoRegra: 'A batedeira não pode ser usada até ser consertada (R$ 30) ou o preparo deve ser feito 100% no braço.',
    testeSugerido: { pericia: 'Fabricar', atributo: 'des', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-3',
    numero: 3,
    tipo: 'obstaculo',
    titulo: 'Pagamento Atrasado',
    narrativa: 'O cliente adorou a entrega, mas pediu desculpas dizendo que teve um imprevisto e só poderá transferir o dinheiro na semana que vem.',
    efeitoRegra: 'A receita deste pedido não entra no caixa imediatamente. O saldo fica retido temporariamente.',
    testeSugerido: { pericia: 'Diplomacia', atributo: 'car', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-4',
    numero: 4,
    tipo: 'obstaculo',
    titulo: 'Gás Acabou!',
    narrativa: 'O recheio está no fogo no meio da fervura, a chama de repente apagou... o botijão de gás acabou e vocês ainda têm pedidos para entregar hoje!',
    efeitoRegra: 'Custo imprevisto de troca de botijão ou necessidade de replanejar etapas que não dependem de fogo.',
    testeSugerido: { pericia: 'Planejamento', atributo: 'int', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-5',
    numero: 5,
    tipo: 'obstaculo',
    titulo: 'Faltou Energia Elétrica',
    narrativa: 'Um temporal na região derrubou galhos na rede elétrica e o bairro todo ficou sem luz. A geladeira parou e as cascas não vão cristalizar a tempo!',
    efeitoRegra: 'Risco de perda das cascas ou atraso na entrega. Exige gelo ou renegociação de prazo com o cliente.',
    testeSugerido: { pericia: 'Logística', atributo: 'con', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-6',
    numero: 6,
    tipo: 'obstaculo',
    titulo: 'Faltou Insumo no Estoque',
    narrativa: 'Ao abrir o armário, vocês descobrem que o chocolate em barra ou o leite condensado acabou antes do previsto na receita.',
    efeitoRegra: 'Obriga a fazer compra de emergência no comércio local (que pode cobrar mais caro) ou criar uma alternativa.',
    testeSugerido: { pericia: 'Criatividade', atributo: 'car', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-7',
    numero: 7,
    tipo: 'obstaculo',
    titulo: 'Pedido Cancelado',
    narrativa: 'O cliente ligou de última hora cancelando o pedido porque o evento dele foi suspenso. A produção já estava adiantada!',
    efeitoRegra: 'Os doces já produzidos ficam no estoque. A equipe precisa vendê-los rapidamente para não ter prejuízo.',
    testeSugerido: { pericia: 'Administração', atributo: 'int', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-8',
    numero: 8,
    tipo: 'obstaculo',
    titulo: 'Sal no Lugar de Açúcar!',
    narrativa: 'Distração total na bancada! Alguém colocou uma colher cheia de sal refinado pensando que fosse açúcar de confeiteiro.',
    efeitoRegra: 'Perda dos ingredientes do recheio daquela panela. Reduz temporariamente 1 ponto de ER (tensão entre os sócios).',
    testeSugerido: { pericia: 'Confeiteiro', atributo: 'des', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-9',
    numero: 9,
    tipo: 'obstaculo',
    titulo: 'Pedido Entregue Errado',
    narrativa: 'Na hora de embalar, as caixas foram trocadas: quem pediu brigadeiro de maracujá recebeu beijinho de coco!',
    efeitoRegra: 'Cliente insatisfeito. Requer desculpas imediatas, brinde ou troca rápida para não perder 2 pontos de REP.',
    testeSugerido: { pericia: 'Diplomacia', atributo: 'car', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-10',
    numero: 10,
    tipo: 'obstaculo',
    titulo: 'Faltou Água Encanada',
    narrativa: 'Manutenção na rede pública da rua cortou o fornecimento de água bem na hora de lavar a louça acumulada e higienizar formas.',
    efeitoRegra: 'Dificulta a produção contínua. Sem formas limpas não há novas cascas. Exige buscar galão de água mineral.',
    testeSugerido: { pericia: 'Logística', atributo: 'con', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-11',
    numero: 11,
    tipo: 'obstaculo',
    titulo: 'Pedido com Alterações de Última Hora',
    narrativa: 'O cliente manda mensagem dizendo que uma pessoa da festa é intolerante à lactose e pergunta se dá para mudar o recheio agora.',
    efeitoRegra: 'Exige adaptação rápida na receita ou propor alternativa como a geleia de frutas puras.',
    testeSugerido: { pericia: 'Criatividade', atributo: 'car', cd: 15 },
    fonte: 'oficial'
  },
  {
    id: 'obstaculo-12',
    numero: 12,
    tipo: 'obstaculo',
    titulo: 'Faltou Embalagem Bonita',
    narrativa: 'A caixa decorada rasgou ou o rolo de fita acabou antes do último laço. O produto está pronto mas não pode ir feio.',
    efeitoRegra: 'Improvisar uma apresentação rústica com papel celofane e barbante sisal ou correr até a papelaria.',
    testeSugerido: { pericia: 'Criatividade', atributo: 'car', cd: 15 },
    fonte: 'oficial'
  },

  // 13-19 Vantagens
  {
    id: 'vantagem-13',
    numero: 13,
    tipo: 'vantagem',
    titulo: 'Gorjeta Generosa de 10%',
    narrativa: 'O cliente ficou tão encantado com a pontualidade e o aroma dos chocolates que fez questão de pagar 10% a mais!',
    efeitoRegra: 'Adicione +10% sobre o valor total recebido na venda direto no Caixa.',
    fonte: 'oficial'
  },
  {
    id: 'vantagem-14',
    numero: 14,
    tipo: 'vantagem',
    titulo: 'Cliente Novo Recomendado',
    narrativa: 'Quem comprou adorou tanto que postou uma foto nas redes sociais marcando o nome da lojinha de vocês!',
    efeitoRegra: 'Garante automaticamente uma nova demanda extra garantida no próximo turno e +2 REP.',
    fonte: 'oficial'
  },
  {
    id: 'vantagem-15',
    numero: 15,
    tipo: 'vantagem',
    titulo: 'Insumo pela Metade do Preço!',
    narrativa: 'Um produtor de cacau ou armazém atacadista parceiro fez uma queima de estoque relâmpago de insumos de primeiríssima qualidade.',
    efeitoRegra: 'A próxima compra de um insumo à sua escolha sai com 50% de desconto no caixa.',
    fonte: 'oficial'
  },
  {
    id: 'vantagem-16',
    numero: 16,
    tipo: 'vantagem',
    titulo: 'A Produção Rendeu Mais!',
    narrativa: 'Com técnica afiada e raspagem precisa da espátula de silicone, o recheio e o chocolate renderam mais unidades do que o previsto na ficha!',
    efeitoRegra: 'O lote atual produz +20% de unidades sem gastar nenhum ingrediente a mais.',
    fonte: 'oficial'
  },
  {
    id: 'vantagem-17',
    numero: 17,
    tipo: 'vantagem',
    titulo: 'Elogio Entusiasmado (+5 REP)',
    narrativa: 'Uma pessoa influente da cidade ou colunista local provou os chocolates de vocês e teceu elogios públicos rasgados!',
    efeitoRegra: 'Aumente imediatamente +5 pontos no indicador de Reputação (REP).',
    fonte: 'oficial'
  },
  {
    id: 'vantagem-18',
    numero: 18,
    tipo: 'vantagem',
    titulo: 'Pedido Aumentado',
    narrativa: 'Antes de a entrega sair, o cliente ligou perguntando se vocês teriam mais caixas prontas para ele levar o dobro!',
    efeitoRegra: 'Se houver estoque disponível, a venda dobra de valor imediatamente.',
    fonte: 'oficial'
  },
  {
    id: 'vantagem-19',
    numero: 19,
    tipo: 'vantagem',
    titulo: 'Tempo de Produção Reduzido em 1/3',
    narrativa: 'Tudo deu certo nesse pedido: o ponto do doce deu rápido, a têmpera cristalizou perfeita e o tempo caiu para 2/3 do normal.',
    efeitoRegra: 'A equipe ganha tempo de folga: pode preparar um lote extra ou descansar para ganhar +1 ponto em ER.',
    fonte: 'oficial'
  }
];

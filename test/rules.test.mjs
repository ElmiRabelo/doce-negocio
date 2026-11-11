import test from 'node:test';
import assert from 'node:assert/strict';

test('Matemática Financeira: Custo Proporcional de Insumo', () => {
  // Exemplo do manual: Pacote de R$ 20 com 500g, usando 150g
  const precoPacote = 20.0;
  const qtdPacote = 500;
  const qtdUsada = 150;

  const custoCalculado = (precoPacote * qtdUsada) / qtdPacote;
  assert.equal(custoCalculado, 6.0, 'O custo proporcional de 150g deve ser R$ 6,00');
});

test('Cena da Tia: Cálculo do Desconto de 10% e Lucro Real', () => {
  // Exemplo do Notion: R$ 24 + R$ 36 = R$ 60
  const preco1 = 24.0;
  const preco2 = 36.0;
  const totalCheio = preco1 + preco2;
  assert.equal(totalCheio, 60.0);

  const desconto10 = totalCheio / 10;
  assert.equal(desconto10, 6.0);

  const totalComDesconto = totalCheio - desconto10;
  assert.equal(totalComDesconto, 54.0);

  // Se o custo unitário somado dos 2 produtos for R$ 22,00
  const custoUnitarioTotal = 22.0;
  const lucroReal = totalComDesconto - custoUnitarioTotal;
  assert.equal(lucroReal, 32.0, 'O lucro líquido após o desconto da tia deve ser R$ 32,00');
});

test('Penalidade de Relacionamento (ER): Perda de 20% do Caixa', () => {
  const caixaInicial = 1400.0;
  const perdaPercentual = 0.20;
  const perdaCalculada = caixaInicial * perdaPercentual;
  const novoCaixa = caixaInicial - perdaCalculada;

  assert.equal(perdaCalculada, 280.0, 'A penalidade de 20% sobre R$ 1400 deve ser R$ 280');
  assert.equal(novoCaixa, 1120.0, 'O novo saldo deve ser R$ 1120');
});

test('Regra de Criação de Personagem: 20 pontos de atributos com teto de 10', () => {
  const atributosValidos = { int: 5, sab: 4, des: 6, car: 3, con: 2 };
  const somaValida = Object.values(atributosValidos).reduce((a, b) => a + b, 0);
  const maxValido = Math.max(...Object.values(atributosValidos));

  assert.equal(somaValida, 20, 'Soma total deve ser exatamente 20');
  assert.ok(maxValido <= 10, 'Nenhum atributo pode ultrapassar 10');

  const atributosInvalidos = { int: 11, sab: 2, des: 3, car: 2, con: 2 };
  const maxInvalido = Math.max(...Object.values(atributosInvalidos));
  assert.ok(maxInvalido > 10, 'Deve identificar quando um atributo ultrapassa o teto de 10');
});

/* 
O jogo da velha não é um jogo de chance, pois não há elementos aleatórios envolvidos. Cada jogada é completamente determinada pelas escolhas dos jogadores.

Dito isso, simplesmente foi tratada todas as jogadas possíveis como tendo a mesma probabilidade.
*/

// Função expectiminimax para jogos de dois jogadores
function expectiminimax(tabuleiro, jogador, profundidade) {
  // Se o jogo terminou, retorne o valor do jogo
  if (tabuleiro.isFim()) {
    return { valor: tabuleiro.vencedor === jogador ? 1 : -1 };
  }

  // Se a profundidade é zero, retorne um valor aleatório
  if (profundidade === 0) {
    return { valor: Math.random() * 2 - 1 };
  }

  // Obtenha todas as jogadas possíveis para o jogador atual
  const jogadas = tabuleiro.possiveisJogadas(jogador);

  let melhorJogada = null;
  let melhorValor = jogador === 'x' ? -Infinity : Infinity;
  let totalValor = 0;
  // Para cada jogada possível
  for (const jogada of jogadas) {
    // Crie um novo tabuleiro e aplique a jogada
    const novoTabuleiro = new JogoDaVelha();
    novoTabuleiro.tabuleiro = tabuleiro.fazerJogada(jogada, jogador);
    novoTabuleiro.vencedor = tabuleiro.jogadorVenceu(jogador) ? jogador : null;

    // Chame recursivamente a função expectiminimax para o próximo jogador e a próxima profundidade
    const resultado = expectiminimax(
      novoTabuleiro,
      jogador === "x" ? "o" : "x",
      profundidade - 1,
    );

    // Atualize o valor total e o melhor valor/jogada
    const valor = resultado.valor;
    totalValor += valor;

    if (jogador === 'x' && valor > melhorValor) {
      melhorValor = valor;
      melhorJogada = jogada;
    } else if (jogador === 'o' && valor < melhorValor) {
      melhorValor = valor;
      melhorJogada = jogada;
    }
  }

  // Calcule o valor médio
  const valorMedio = totalValor / jogadas.length;

  // Retorne a melhor jogada e o valor correspondente
  return { jogada: melhorJogada, valor: jogador === 'x' ? melhorValor : valorMedio };
}


class JogoDaVelha {
  constructor() {
    this.tabuleiro = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.vencedor = null;
  }

  isFim() {
    return this.vencedor !== null || this.possiveisJogadas('x').length === 0;
  }

  jogadorVenceu(jogador) {
    return (
      (this.tabuleiro[0][0] === jogador &&
        this.tabuleiro[1][0] === jogador &&
        this.tabuleiro[2][0] === jogador) ||
      (this.tabuleiro[0][1] === jogador &&
        this.tabuleiro[1][1] === jogador &&
        this.tabuleiro[2][1] === jogador) ||
      (this.tabuleiro[0][2] === jogador &&
        this.tabuleiro[1][2] === jogador &&
        this.tabuleiro[2][2] === jogador) ||
      (this.tabuleiro[0][0] === jogador &&
        this.tabuleiro[1][1] === jogador &&
        this.tabuleiro[2][2] === jogador) ||
      (this.tabuleiro[0][2] === jogador &&
        this.tabuleiro[1][1] === jogador &&
        this.tabuleiro[2][0] === jogador)
    );
  }

  possiveisJogadas(jogador) {
    const jogadas = [];
    for (let linha = 0; linha < this.tabuleiro.length; linha++) {
      for (let coluna = 0; coluna < this.tabuleiro[linha].length; coluna++) {
        if (this.tabuleiro[linha][coluna] === 0) {
          jogadas.push({ linha, coluna });
        }
      }
    }
    return jogadas;
  }

  fazerJogada(jogada, jogador) {
    const novoTabuleiro = JSON.parse(JSON.stringify(this.tabuleiro));
    novoTabuleiro[jogada.linha][jogada.coluna] = jogador;
    return novoTabuleiro;
  }

  imprimir() {
    for (let linha = 0; linha < this.tabuleiro.length; linha++) {
      console.log(this.tabuleiro[linha].join(" | "));
    }
    console.log('');
  }
}

const jogo = new JogoDaVelha();
jogo.imprimir();

let jogadorAtual = 'o';
while (!jogo.isFim()) {
  const jogada = expectiminimax(jogo, jogadorAtual, 9, -Infinity, Infinity);
  jogo.tabuleiro = jogo.fazerJogada(jogada.jogada, jogadorAtual);
  jogo.vencedor = jogo.jogadorVenceu(jogadorAtual) ? jogadorAtual : null;
  jogo.imprimir();
  jogadorAtual = jogadorAtual === 'x' ? 'o' : 'x';
}

// Versão alfa-beta
function minimax(tabuleiro, jogador, profundidade, alfa, beta) {
  // Verifica se o jogo terminou
  if (tabuleiro.isFim()) {
    // Retorna 1 se o jogador venceu, -1 se perdeu
    return { valor: tabuleiro.vencedor === jogador ? 1 : -1 };
  }

  // Se a profundidade é zero, retorna um valor aleatório
  if (profundidade === 0) {
    return { valor: Math.random() * 2 - 1 };
  }

  // Obtém todas as jogadas possíveis para o jogador atual
  const jogadas = tabuleiro.possiveisJogadas(jogador);

  let melhorJogada = null;
  let melhorValor = jogador === 'x' ? -Infinity : Infinity;
  for (const jogada of jogadas) {
    // Cria um novo tabuleiro e faz a jogada
    const novoTabuleiro = new JogoDaVelha();
    novoTabuleiro.tabuleiro = tabuleiro.fazerJogada(jogada, jogador);
    novoTabuleiro.vencedor = tabuleiro.jogadorVenceu(jogador) ? jogador : null;

    // Chama a função minimax para o próximo jogador e a próxima profundidade
    const resultado = minimax(
      novoTabuleiro,
      jogador === "x" ? "o" : "x",
      profundidade - 1,
      alfa,
      beta,
    );

    const valor = resultado.valor;

    // Se o jogador é 'x', procura o valor máximo
    if (jogador === 'x') {
      if (valor > melhorValor) {
        melhorValor = valor;
        melhorJogada = jogada;
      }
      alfa = Math.max(alfa, melhorValor);
    } else {
      // Se o jogador é 'o', procura o valor mínimo
      if (valor < melhorValor) {
        melhorValor = valor;
        melhorJogada = jogada;
      }
      beta = Math.min(beta, melhorValor);
    }

    // Se beta é menor ou igual a alfa, interrompe o loop (poda alfa-beta)
    if (beta <= alfa) {
      break;
    }
  }

  // Retorna a melhor jogada e o valor correspondente
  return { jogada: melhorJogada, valor: melhorValor };
}

class JogoDaVelha {
  constructor() {
    // Inicializa o tabuleiro com zeros
    this.tabuleiro = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.vencedor = null;
  }

  // Verifica se o jogo terminou
  isFim() {
    return this.vencedor !== null || this.possiveisJogadas('x').length === 0;
  }

  // Verifica se o jogador venceu
  jogadorVenceu(jogador) {
    // Verifica todas as linhas, colunas e diagonais
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

  // Retorna todas as jogadas possíveis para o jogador
  possiveisJogadas(jogador) {
    const jogadas = [];
    for (let linha = 0; linha < this.tabuleiro.length; linha++) {
      for (let coluna = 0; coluna < this.tabuleiro[linha].length; coluna++) {
        // Se a posição está vazia, adiciona à lista de jogadas
        if (this.tabuleiro[linha][coluna] === 0) {
          jogadas.push({ linha, coluna });
        }
      }
    }
    return jogadas;
  }

  // Faz uma jogada e retorna o novo tabuleiro
  fazerJogada(jogada, jogador) {
    const novoTabuleiro = JSON.parse(JSON.stringify(this.tabuleiro));
    novoTabuleiro[jogada.linha][jogada.coluna] = jogador;
    return novoTabuleiro;
  }

  // Imprime o tabuleiro no console
  imprimir() {
    for (let linha = 0; linha < this.tabuleiro.length; linha++) {
      console.log(this.tabuleiro[linha].join(" | "));
    }
    console.log('');
  }
}

// Cria um novo jogo
const jogo = new JogoDaVelha();
jogo.imprimir();

let jogadorAtual = 'o';
// Enquanto o jogo não terminar, faz jogadas
while (!jogo.isFim()) {
  const jogada = minimax(jogo, jogadorAtual, 9, -Infinity, Infinity);
  jogo.tabuleiro = jogo.fazerJogada(jogada.jogada, jogadorAtual);
  jogo.vencedor = jogo.jogadorVenceu(jogadorAtual) ? jogadorAtual : null;
  jogo.imprimir();
  // Alterna o jogador
  jogadorAtual = jogadorAtual === 'x' ? 'o' : 'x';
}

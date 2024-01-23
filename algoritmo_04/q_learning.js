class QLearningJogoDaVelha {
  constructor() {
    // Inicializa o tabuleiro com zeros
    this.tabuleiro = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.vencedor = null;
    this.tabelaQ = {}; // Tabela Q
  }

  // Verifica se o jogo terminou
  isFim() {
    return this.vencedor !== null || this.possiveisJogadas('x').length === 0;
  }

  // Obtém o valor Q para um estado e ação específicos
  getQValue(estado, acao) {
    return this.tabelaQ[estado] && this.tabelaQ[estado][acao] ? this.tabelaQ[estado][acao] : 0;
  }

  // Atualiza o valor Q para um estado e ação específicos
  updateQValue(estado, acao, novoValor) {
    if (!this.tabelaQ[estado]) {
      this.tabelaQ[estado] = {};
    }
    this.tabelaQ[estado][acao] = novoValor;
  }

  // Executa o Q-learning para escolher a próxima jogada
  escolherProximaJogada(epsilon) {
    const estadoAtual = JSON.stringify(this.tabuleiro);
    const jogadasPossiveis = this.possiveisJogadas('x'); // Supomos que 'x' é o agente Q-learning

    // Exploração (epsilon-greedy)
    if (Math.random() < epsilon) {
      const jogadaAleatoria = jogadasPossiveis[Math.floor(Math.random() * jogadasPossiveis.length)];
      return jogadaAleatoria;
    } else {
      // Escolhe a jogada com o maior valor Q
      let melhorJogada = null;
      let melhorValor = -Infinity;

      for (const jogada of jogadasPossiveis) {
        const acao = JSON.stringify(jogada);
        const valorQ = this.getQValue(estadoAtual, acao);

        if (valorQ > melhorValor) {
          melhorValor = valorQ;
          melhorJogada = jogada;
        }
      }

      return melhorJogada;
    }
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

// Cria um novo jogo Q-learning
const jogoQLearning = new QLearningJogoDaVelha();
jogoQLearning.imprimir();

let jogadorAtual = 'o';
const epsilon = 0.1; // Taxa de exploração
// Enquanto o jogo não terminar, faz jogadas
while (!jogoQLearning.isFim()) {
  const jogada = jogoQLearning.escolherProximaJogada(epsilon);
  jogoQLearning.tabuleiro = jogoQLearning.fazerJogada(jogada, jogadorAtual);
  jogoQLearning.vencedor = jogoQLearning.jogadorVenceu(jogadorAtual) ? jogadorAtual : null;
  jogoQLearning.imprimir();
  // Alterna o jogador
  jogadorAtual = jogadorAtual === 'x' ? 'o' : 'x';
}

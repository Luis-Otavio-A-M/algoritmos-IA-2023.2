// Definir o número de estados e ações
const numStates = 10;
const numActions = 4;

// Definir a taxa de aprendizado e o fator de desconto
const learningRate = 0.8;
const discountFactor = 0.95;

// Inicializar a tabela Q com valores aleatórios
const qTable = new Array(numStates).fill(0).map(() => new Array(numActions).fill(Math.random()));

// Definir a função de atualização da tabela Q
function updateQTable(estadoAnterior, acao, recompensa, estadoAtual) {
  const currentQValue = qTable[estadoAnterior][acao];
  const maxNextQValue = Math.max(...qTable[estadoAtual]);
  const newQValue = currentQValue + learningRate * (recompensa + discountFactor * maxNextQValue - currentQValue);
  qTable[estadoAnterior][acao] = newQValue;
}

// Definir a função de escolha da ação
function chooseAction(estado) {
  const randomValue = Math.random();
  if (randomValue < 0.1) {
    return Math.floor(Math.random() * numActions);
  } else {
    return qTable[estado].indexOf(Math.max(...qTable[estado]));
  }
}

// Executar o algoritmo Q-Learning
for (let i = 0; i < 1000; i++) {
  let estado = Math.floor(Math.random() * numStates);
  let acao = chooseAction(estado);
  let recompensa = Math.random() * 10;
  let nextState = Math.floor(Math.random() * numStates);
  updateQTable(estado, acao, recompensa, nextState);
}

// Imprimir a tabela Q
console.log(qTable);
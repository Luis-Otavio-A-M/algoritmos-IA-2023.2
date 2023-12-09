function distanciaDoisPontos(x1, y1, x2, y2) {
    let cateto1 = x1 - x2;
    let cateto2 = y1 - y2;
    let somaQuadradoCatetos = Math.pow(cateto1, 2) + Math.pow(cateto2, 2);
    let resultado = Math.sqrt(somaQuadradoCatetos);
    return resultado;  
};

function pontoExiste(matriz, ponto = [x, y]) {
    let x = ponto[0];
    let y = ponto[1];

    return (
        x >= 0
        && x < matriz.length
        && y >= 0
        && y < matriz[0].length        
    )
}

class Celula {
    pos_x;
    pos_y;
    g = 1;
    h;
    f;

    constructor(posisao_celula = [x,y], g_anterior, posicao_destino = [x,y]) {
        this.pos_x = posisao_celula[0];
        this.pos_y = posisao_celula[1];
        this.g += g_anterior;
        this.h = distanciaDoisPontos(this.pos_x, this.pos_y, 
            posicao_destino[0], posicao_destino[1]);
        this.f = this.g + this.h;
    };
}

function encontrarPonto(ponto = [x, y], fechado = []) {
    return fechado.find(celula => celula.pos_x == ponto[0] && celula.pos_y == ponto[1]);
}

function procurarVizinhos(matrizNavegacao, celula_atual, destino = [x,y], fechado = [],) {
    let vizinhos = [];
    let x = celula_atual.pos_x;
    let y = celula_atual.pos_y;
    g = celula_atual.g;

    if (pontoExiste(matrizNavegacao, [x, y+1]) 
        && matrizNavegacao[x][y+1] === 0
        && !encontrarPonto([x, y+1], fechado)) {
        vizinhos.push(new Celula([x, y+1], g, destino));
    };

    if (pontoExiste(matrizNavegacao, [x, y-1])
        && matrizNavegacao[x][y-1] === 0
        && !encontrarPonto([x, y-1], fechado)) {
        vizinhos.push(new Celula([x, y-1], g, destino));
    };

    if (pontoExiste(matrizNavegacao, [x+1, y]) 
        && matrizNavegacao[x+1][y] === 0
        && !encontrarPonto([x+1, y], fechado)) {
        vizinhos.push(new Celula([x+1, y], g, destino));
    };

    if (pontoExiste(matrizNavegacao, [x-1, y])
        && matrizNavegacao[x-1][y] === 0
        && !encontrarPonto([x-1, y], fechado)) {
        vizinhos.push(new Celula([x-1, y], g, destino));
    };

    return vizinhos.sort((a, b) => a.f - b.f);
}

function Aestrela(matrizNavegacao, inicio = [x, y], destino = [x, y]) {
    let aberto = [];
    let fechado = [];
    let celula = new Celula(inicio, 0, destino);
    aberto.push(celula);
    let vizinhos = [];

    while (aberto.length !== 0) {
        celula_atual = aberto[0];
        fechado.push(celula_atual);

        if (celula_atual.pos_x === destino[0] && celula_atual.pos_y === destino[1]) {
            return fechado;
        }

        vizinhos = procurarVizinhos(matrizNavegacao, celula_atual, destino, fechado);
        aberto = vizinhos;
    }
    return [];
}

function mostrarCaminhoMatriz(matriz = [], caminho = []) {
    if (caminho.length === 0) {
        console.log('Caminho não encontrado!');
        return;
    }
    let passo = 0;

    for (let i = 0; i < caminho.length; i++) {
        matriz[caminho[i].pos_x][caminho[i].pos_y] = ++passo;
    }

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (encontrarPonto([i,j], caminho)) {
                if (matriz[i][j] < 10) {
                    process.stdout.write(` \x1b[38;2;0;255;0m${matriz[i][j]}\x1b[0m `);
                } else {
                    process.stdout.write(`\x1b[38;2;0;255;0m${matriz[i][j]}\x1b[0m `);
                }
            }
            else if (matriz[i][j] === 1) {
                if (matriz[i][j] < 10) {
                    process.stdout.write(` \x1b[31m${matriz[i][j]}\x1b[0m `);
                } else {
                    process.stdout.write(`\x1b[31m${matriz[i][j]}\x1b[0m `);
                }
             
            }
            else {
                if (matriz[i][j] < 10) {
                    process.stdout.write(` ${matriz[i][j]} `);
                }
                else {
                    process.stdout.write(`${matriz[i][j]} `);
                }
            }
        }
        console.log();
    }
    console.log();
}

const matrizNavegacao = [
    [0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1],
    [0, 1, 0, 0, 0, 0]
];

const matrizBairro = [
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

// matriz 24X9
const matrizRubem = [														
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0]
]			

//mostrarCaminhoMatriz(matrizNavegacao, Aestrela(matrizNavegacao, [0,0], [5,5]))
//mostrarCaminhoMatriz(matrizBairro, Aestrela(matrizBairro, [0,0], [19,15]));
//mostrarCaminhoMatriz(matrizRubem, Aestrela(matrizRubem, [1,0], [16, 5]));
//mostrarCaminhoMatriz(matrizRubem, Aestrela(matrizRubem, [1,0], [10, 11]));
//mostrarCaminhoMatriz(matrizRubem, Aestrela(matrizRubem, [0,0], [24, 11]));
mostrarCaminhoMatriz(matrizRubem, Aestrela(matrizRubem, [0,0], [12, 11]));
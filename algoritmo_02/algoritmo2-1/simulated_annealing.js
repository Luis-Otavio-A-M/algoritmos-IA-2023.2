const fitness = function (x) {
  return Math.sin(x) * x;
};

const config = {
  initialTemperature: 100,
  coolingFactor: 0.95,
  freezingTemperature: 0.01,
  stabilizingFactor: 0.99,
  iterations: 1000,
};

const simulatedAnnealing = {
  optimize: function (fitness, config) {
    let currentSolution = Math.random() * 10;
    let currentEnergy = fitness(currentSolution);
    let bestSolution = currentSolution;
    let bestEnergy = currentEnergy;

    for (let i = 0; i < config.iterations; i++) {
      let newSolution = currentSolution + (Math.random() - 0.5) * 0.1;
      let newEnergy = fitness(newSolution);
      let deltaEnergy = newEnergy - currentEnergy;

      if (deltaEnergy < 0 || Math.exp(-deltaEnergy / config.initialTemperature) > Math.random()) {
        currentSolution = newSolution;
        currentEnergy = newEnergy;
      }

      if (currentEnergy < bestEnergy) {
        bestSolution = currentSolution;
        bestEnergy = currentEnergy;
      }

      config.initialTemperature *= config.coolingFactor;
      config.stabilizingFactor *= config.stabilizingFactor;
    }

    return {
      bestSolution: bestSolution,
      bestEnergy: bestEnergy,
    };
  },
};

const result = simulatedAnnealing.optimize(fitness, config);

console.log(`O valor máximo da função é ${result.bestEnergy}.`);
console.log(`O valor de x que maximiza a função é ${result.bestSolution}.`);
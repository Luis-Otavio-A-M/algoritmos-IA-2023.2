const fitness = function (x) {
  return Math.sin(x) * x;
};

const config = {
  iterations: 1000,
  size: 200,
  crossover: 0.4,
  mutation: 0.3,
  skip: 20,
};

const genetic = {
  optimize: function (fitness, config) {
    let population = [];
    let bestScore = -Infinity;
    let bestIndividual = null;

    for (let i = 0; i < config.size; i++) {
      population.push({
        entity: Math.random() * 10,
        fitness: null,
      });
    }

    for (let i = 0; i < config.iterations; i++) {
      for (let j = 0; j < population.length; j++) {
        population[j].fitness = fitness(population[j].entity);
      }

      population.sort(function (a, b) {
        return b.fitness - a.fitness;
      });

      if (population[0].fitness > bestScore) {
        bestScore = population[0].fitness;
        bestIndividual = population[0];
      }

      let newPopulation = [];

      for (let j = 0; j < config.skip; j++) {
        newPopulation.push(population[j]);
      }

      for (let j = 0; j < config.size - config.skip; j++) {
        let parentA = population[Math.floor(Math.random() * (config.size / 2))];
        let parentB = population[Math.floor(Math.random() * (config.size / 2))];
        let child = {
          entity: (parentA.entity + parentB.entity) / 2,
          fitness: null,
        };

        if (Math.random() < config.mutation) {
          child.entity += (Math.random() - 0.5) * 0.1;
        }

        newPopulation.push(child);
      }

      population = newPopulation;
    }

    return {
      bestScore: bestScore,
      bestIndividual: bestIndividual,
    };
  },
};

const result = genetic.optimize(fitness, config);

console.log(`O valor máximo da função é ${result.bestScore}.`);
console.log(`O valor de x que maximiza a função é ${result.bestIndividual.entity}.`);
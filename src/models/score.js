let score = 0;

const getScore = () => score;

const incScore = (points) => {
  score += points;
  return `${score}`;
};

const resetScore = () => {
  score = 0;
  return `Score reset to ${score}`;
};

export { getScore, incScore, resetScore };
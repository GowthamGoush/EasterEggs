export const getRandomPositionArray = ({
  gameWidth,
  gameHeight,
  size,
  count,
  distanceBuffer = 0,
}) => {
  let positions = [];
  for (let attemps = 0; attemps < 500 && count > 0; attemps++) {
    const posX = Math.random() * gameWidth;
    const posY = Math.random() * gameHeight;

    let hasOverlap = false;
    for (let posIndex = 0; posIndex < positions.length; posIndex++) {
      const prevObstacle = positions[posIndex];

      const dx = Math.abs(prevObstacle.posX - posX);
      const dy = Math.abs(prevObstacle.posY - posY);

      const distance = Math.hypot(dy, dx);

      if (distance < size * 2 + distanceBuffer) {
        hasOverlap = true;
        break;
      }
    }

    if (!hasOverlap) {
      positions.push({
        posX,
        posY,
      });
      count--;
    }
  }

  return positions;
};

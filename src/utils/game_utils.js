import { LOSING_SCORE, WINNING_SCORE } from "../constants/game_constants";

export const getRandomPositionArray = ({
  gameWidth,
  gameHeight,
  verticalMargin = 0,
  horizontalMargin = 0,
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

      const dx = prevObstacle.posX - posX;
      const dy = prevObstacle.posY - posY;

      const distance = Math.hypot(dy, dx);

      if (distance < Math.max(size * 2, distanceBuffer)) {
        hasOverlap = true;
        break;
      }
    }

    if (
      !hasOverlap &&
      posX > horizontalMargin + size * 2 &&
      posY > verticalMargin + size * 2 &&
      posX < gameWidth - size &&
      posY < gameHeight
    ) {
      positions.push({
        posX: posX,
        posY: posY,
      });
      count--;
    }
  }

  return positions;
};

export const isGameOver = ({ score = 0, lostHatchlings = 0 }) => {
  return score >= WINNING_SCORE || lostHatchlings >= LOSING_SCORE;
};

export const getGameOverContent = ({ score = 0, lostHatchlings }) => {
  const restartText = "Press 'R' to restart the game";

  if (score >= WINNING_SCORE) {
    return {
      title: "AWESOME!!!",
      description: `You nailed it with ${score} points!`,
      restartText,
    };
  }

  if (score >= Math.floor(WINNING_SCORE * 0.9)) {
    return {
      title: "SO CLOSE!!!",
      description: `Almost there with ${score} points!`,
      restartText,
    };
  }

  return {
    title: "OOPS!!!",
    description: `You lost ${lostHatchlings} hatchlings!`,
    restartText,
  };
};

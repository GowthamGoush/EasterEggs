export const getPlayerPositionIndex = (dx, dy) => {
  const angleInRadians = Math.atan2(dy, dx);

  if (angleInRadians < -2.74 || angleInRadians > 2.74) return 6;
  if (angleInRadians < -1.96) return 7;
  if (angleInRadians < -1.17) return 0;
  if (angleInRadians < -0.39) return 1;
  if (angleInRadians < 0.39) return 2;
  if (angleInRadians < 1.17) return 3;
  if (angleInRadians < 1.96) return 4;
  if (angleInRadians < 2.74) return 5;
};

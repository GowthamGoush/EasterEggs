export const drawText = ({
  context,
  content,
  posX,
  posY,
  align,
  fontStyle,
}) => {
  context.font = fontStyle;
  context.textAlign = align;
  context.fillText(content, posX, posY);
};

export const colorsAvailable = ["red", "green", "pink"];

const random = (mn, mx) => Math.random() * (mx - mn) + mn;

export const getRandomColor = () => {
  return colorsAvailable[Math.floor(random(0, colorsAvailable.length))];
};

export const wasOutsideBeforeDrag = (elementToFind, insideElements) =>
  !insideElements.some((e) => e.elementN === elementToFind.elementN);

export const isInside = (ref, dragData) => {
  const actualPosX = dragData.node.offsetLeft + dragData.x;
  const actualPosY = dragData.node.offsetTop + dragData.y;

  const limitLeft = ref.current.offsetLeft;
  const limitRight = ref.current.offsetLeft + ref.current.offsetWidth;
  const inX = actualPosX >= limitLeft && actualPosX <= limitRight;

  const limitTop = ref.current.offsetTop;
  const limitBot = ref.current.offsetTop + ref.current.offsetHeight;
  const inY = actualPosY >= limitTop && actualPosY <= limitBot;

  return inX && inY;
};

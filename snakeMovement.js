// Function to prrevent the Battlesnake from colliding with itself
export function preventSelfCollision(gameState, isMoveSafe) {
  const myBody = gameState.you.body;
  const myHead = gameState.you.body[0];

  Object.keys(isMoveSafe).forEach((move) => {
    if (isMoveSafe[move]) {
      let nextHeadPosition = { x: myHead.x, y: myHead.y };

      if (move === "up") {
        nextHeadPosition.y += 1;
      } else if (move === "down") {
        nextHeadPosition.y -= 1;
      } else if (move === "left") {
        nextHeadPosition.x -= 1;
      } else if (move === "right") {
        nextHeadPosition.x += 1;
      }

      // Exclude the neck (second body segment) from the collision check
      const bodyToCheck = myBody.slice(1);

      // Check if the next head position collides with any part of the body
      if (
        bodyToCheck.some(
          (segment) =>
            segment.x === nextHeadPosition.x &&
            segment.y === nextHeadPosition.y,
        )
      ) {
        isMoveSafe[move] = false;
      }
    }
  });

  return isMoveSafe;
}

export function avoidWalls(gameState, isMoveSafe) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  const myHead = gameState.you.body[0];

  if (myHead.x === 0) isMoveSafe.left = false; // Left wall
  if (myHead.x === boardWidth - 1) isMoveSafe.right = false; // Right wall
  if (myHead.y === 0) isMoveSafe.down = false; // Bottom wall
  if (myHead.y === boardHeight - 1) isMoveSafe.up = false; // Top wall

  return isMoveSafe;
}

//Todo3-Snake avoids collision with other snakes
export function avoidCollisionsWithOtherSnakes(gameState, isMoveSafe) {
  const myHead = gameState.you.head;
  const otherSnakes = gameState.board.snakes;

  otherSnakes.forEach((snake) => {
    snake.body.forEach((segment) => {
      if (segment.x === myHead.x + 1 && segment.y === myHead.y) {
        isMoveSafe.right = false;
      } else if (segment.x === myHead.x - 1 && segment.y === myHead.y) {
        isMoveSafe.left = false;
      } else if (segment.y === myHead.y + 1 && segment.x === myHead.x) {
        isMoveSafe.up = false;
      } else if (segment.y === myHead.y - 1 && segment.x === myHead.x) {
        isMoveSafe.down = false;
      }
    });
  });

  return isMoveSafe;
}

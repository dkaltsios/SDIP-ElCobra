// Function to prrevent the Battlesnake from colliding with itself
export function preventSelfCollision(gameState, isMoveSafe) {
  const myBody = gameState.you.body;
  const myHead = gameState.you.body[0];

  for (const move of Object.keys(isMoveSafe)) {
    if (isMoveSafe[move]) {
      let nextHeadPosition = { x: myHead.x, y: myHead.y };

      switch (move) {
        case "up": {
          nextHeadPosition.y += 1;

          break;
        }
        case "down": {
          nextHeadPosition.y -= 1;

          break;
        }
        case "left": {
          nextHeadPosition.x -= 1;

          break;
        }
        case "right": {
          nextHeadPosition.x += 1;

          break;
        }
        // No default
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
  }

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

  for (const snake of otherSnakes) {
    for (const segment of snake.body) {
      if (segment.x === myHead.x + 1 && segment.y === myHead.y) {
        isMoveSafe.right = false;
      } else if (segment.x === myHead.x - 1 && segment.y === myHead.y) {
        isMoveSafe.left = false;
      } else if (segment.y === myHead.y + 1 && segment.x === myHead.x) {
        isMoveSafe.up = false;
      } else if (segment.y === myHead.y - 1 && segment.x === myHead.x) {
        isMoveSafe.down = false;
      }
    }
  }

  return isMoveSafe;
}


// Todo9-Prevent head-to-head collisions with equal or longer snakes
export function avoidHeadToHead(gameState, isMoveSafe) {
  const myHead = gameState.you.head;
  const myLength = gameState.you.length;
  const directions = {
    up:    { x: myHead.x,     y: myHead.y + 1 },
    down:  { x: myHead.x,     y: myHead.y - 1 },
    left:  { x: myHead.x - 1, y: myHead.y     },
    right: { x: myHead.x + 1, y: myHead.y     },
  };

  for (const snake of gameState.board.snakes) {
    if (snake.id === gameState.you.id) continue; // Skip self
    const theirHead = snake.head;
    const theirLength = snake.length;

    // All possible moves their head could make
    const theirMoves = [
      { x: theirHead.x,     y: theirHead.y + 1 },
      { x: theirHead.x,     y: theirHead.y - 1 },
      { x: theirHead.x - 1, y: theirHead.y     },
      { x: theirHead.x + 1, y: theirHead.y     },
    ];

    for (const [move, pos] of Object.entries(directions)) {
      if (
        isMoveSafe[move] &&
        theirMoves.some(
          (m) => m.x === pos.x && m.y === pos.y
        ) &&
        theirLength >= myLength // Only avoid if they are equal or longer
      ) {
        isMoveSafe[move] = false;
      }
    }
  }
  return isMoveSafe;
}
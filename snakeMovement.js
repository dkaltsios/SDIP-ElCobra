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

function getDistanceFromTo(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

export function moveTowardClosestFood(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  function getClosestFood() {
    let closestFood;
    let closestDistance = Infinity;
    for (const food of gameState.board.food) {
      const distance = getDistanceFromTo(myHead.x, myHead.y, food.x, food.y);
      if (distance < closestDistance) {
        closestFood = food;
        closestDistance = distance;
      }
    }
    return closestFood;
  }

  const closestFood = getClosestFood();
  let closestFoodDirection = [];
  let newIsMoveSafe = {};

  if (closestFood.x == myHead.x) {
    closestFoodDirection =
      closestFood.y > myHead.y
        ? ["up", "right", "left", "down"]
        : ["down", "right", "left", "up"];
  } else if (closestFood.x > myHead.x) {
    if (closestFood.y == myHead.y) {
      closestFoodDirection = ["right", "up", "down", "left"];
    } else if (closestFood.y > myHead.y) {
      closestFoodDirection = ["right", "up", "left", "down"];
    } else {
      closestFoodDirection = ["right", "down", "left", "up"];
    }
  } else {
    if (closestFood.y == myHead.y) {
      closestFoodDirection = ["left", "up", "down", "right"];
    } else if (closestFood.y > myHead.y) {
      closestFoodDirection = ["left", "up", "right", "down"];
    } else {
      closestFoodDirection = ["left", "down", "right", "up"];
    }
  }

  for (const move of closestFoodDirection) {
    newIsMoveSafe[move] = isMoveSafe[move];
  }
  return newIsMoveSafe;
}

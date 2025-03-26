// Function to prrevent the Battlesnake from colliding with itself
export function preventSelfCollision(gameState, isMoveSafe) {
    const myBody = gameState.you.body;
    const myHead = gameState.you.body[0];
  
    Object.keys(isMoveSafe).forEach(move => {
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
        if (bodyToCheck.some(segment => segment.x === nextHeadPosition.x && segment.y === nextHeadPosition.y)) {
          isMoveSafe[move] = false;
        }
      }
    });
  
    return isMoveSafe;
}
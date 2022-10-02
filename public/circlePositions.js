export default function getCirclePositions(
  gridOriginX,
  gridOriginY,
  cellWidth,
  diceRoll
) {
  return diceRoll.map(function (face) {
    let faceX = face[0] - 1;
    let faceY = face[1] - 1;
    let pegX = gridOriginX + cellWidth / 2 + faceX * cellWidth;
    let pegY = gridOriginY + cellWidth / 2 + faceY * cellWidth;
    return new Phaser.Geom.Point(pegX, pegY);
  });
}

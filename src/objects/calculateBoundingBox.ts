import { Mesh, Vector3, VertexData } from "@babylonjs/core";

const calculateBoundingBox = (mesh: Mesh): Vector3 => {
  var minX = 99999;
  var minY = 99999;
  var minZ = 99999;
  var maxX = -99999;
  var maxY = -99999;
  var maxZ = -99999;

  const children = mesh.getChildren() as Mesh[];

  // TODO: Refactor as this was borrowed code and is messy

  for (var i = 0; i < children.length; i++) {
    const positions = VertexData.ExtractFromGeometry(
      children[i].geometry
    ).positions;
    if (!positions) continue;

    var index = 0;
    for (var j = index; j < positions.length; j += 3) {
      if (positions[j] < minX) minX = positions[j];
      if (positions[j] > maxX) maxX = positions[j];
    }
    index = 1;
    for (var j = index; j < positions.length; j += 3) {
      if (positions[j] < minY) minY = positions[j];
      if (positions[j] > maxY) maxY = positions[j];
    }
    index = 2;
    for (var j = index; j < positions.length; j += 3) {
      if (positions[j] < minZ) minZ = positions[j];
      if (positions[j] > maxZ) maxZ = positions[j];
    }
  }

  return new Vector3(maxX - minX, maxY - minY, maxZ - minZ);
};

export default calculateBoundingBox;

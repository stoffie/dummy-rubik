(function(){

var Cubie3D = rubik.Cubie3D;
var Cube3D = rubik.Cube3D = function(geometry, materials) {
  THREE.Object3D.call(this);

  this.animating = false;

  this._rotation = null;
  this._animationSteps = 0;
  this._stepCount = 0;
  this._cubies = {}
  this._animating = false;
  this._rotationNode = new THREE.Object3D();
  this.add(this._rotationNode);
  var i = 0;
  var magic = 2;
  for (var x = -1; x <= +1; x++) {
    for (var y = -1; y <= +1; y++) {
      for (var z = -1; z <= +1; z++) {
        if (x === 0 && y === 0 && z === 0) {
          continue;
        }
        var cubie = new Cubie3D(geometry, new THREE.MeshFaceMaterial(materials));
        this._cubies[Cube3D.CUBIE_POSITION[i]] = cubie;
        cubie.rubikPosition = Cube3D.CUBIE_POSITION[i];
        i++;
        cubie.position.set(x * magic, y * magic, z * magic);
        this.add(cubie);
      }
    }
  }
  //this._rotationNode.rotation.z = Math.PI / 4;
  //this._attachCubiesToRotationNode(rubik.cube.FACES.F);
  //this._rotationNode.rotation.z = Math.PI / 4;
  //this._attachCubiesToRotationNode(rubik.cube.FACES.B);
  //this._rotationNode.rotation.y = Math.PI / 4;
  //this._attachCubiesToRotationNode(rubik.cube.FACES.U);
  //this._rotationNode.rotation.y = Math.PI / 4;
  //this._attachCubiesToRotationNode(rubik.cube.FACES.D);
  //this._rotationNode.rotation.x = Math.PI / 4;
  //this._attachCubiesToRotationNode(rubik.cube.FACES.L);
  //this._rotationNode.rotation.x = Math.PI / 4;
  //this._attachCubiesToRotationNode(rubik.cube.FACES.R);
}

Cube3D.prototype = Object.create(THREE.Object3D.prototype);

Cube3D.axisX = new THREE.Vector3(1, 0, 0);
Cube3D.axisY = new THREE.Vector3(0, 1, 0);
Cube3D.axisZ = new THREE.Vector3(0, 0, 1);

Cube3D.CUBIE_POSITION = [
  rubik.CORNERS.DBL, // -1, -1, -1
  rubik.EDGES.DL, // -1, -1, 0
  rubik.CORNERS.DLF, // -1, -1, +1
  rubik.EDGES.LB, // -1, 0, -1
  rubik.FACES.L, // -1, 0, 0
  rubik.EDGES.FL, // -1, 0, +1
  rubik.CORNERS.UBL, // -1, +1, -1
  rubik.EDGES.UL, // -1, +1, 0
  rubik.CORNERS.UFL, // -1, +1, +1
  rubik.EDGES.DB, // 0, -1, -1
  rubik.FACES.D, // 0, -1, 0
  rubik.EDGES.DF, // 0, -1, +1
  rubik.FACES.B, // 0, 0, -1
  // skip cubie 0, 0, 0
  rubik.FACES.F, // 0, 0, +1
  rubik.EDGES.UB, // 0, +1, -1
  rubik.FACES.U, // 0, +1, 0
  rubik.EDGES.UF, // 0, +1, +1
  rubik.CORNERS.DRB, // +1, -1, -1
  rubik.EDGES.DR, // +1, -1, 0
  rubik.CORNERS.DFR, // +1, -1, +1
  rubik.EDGES.BR, // +1, 0, -1
  rubik.FACES.R, // +1, 0, 0
  rubik.EDGES.RF, // +1, 0, +1
  rubik.CORNERS.UBR, // +1, +1, -1
  rubik.EDGES.UR, // +1, +1, 0
  rubik.CORNERS.URF, // +1, +1, +1
];

Cube3D.FACE_NEIGHBORS = {};
Cube3D.FACE_NEIGHBORS[rubik.FACES.R] = [
  rubik.EDGES.UR,
  rubik.EDGES.DR,
  rubik.EDGES.RF,
  rubik.EDGES.BR,
  rubik.CORNERS.URF,
  rubik.CORNERS.UBR,
  rubik.CORNERS.DFR,
  rubik.CORNERS.DRB,
];
Cube3D.FACE_NEIGHBORS[rubik.FACES.L] = [
  rubik.EDGES.UL,
  rubik.EDGES.DL,
  rubik.EDGES.FL,
  rubik.EDGES.LB,
  rubik.CORNERS.UFL,
  rubik.CORNERS.UBL,
  rubik.CORNERS.DLF,
  rubik.CORNERS.DBL,
];
Cube3D.FACE_NEIGHBORS[rubik.FACES.U] = [
  rubik.EDGES.UL,
  rubik.EDGES.UR,
  rubik.EDGES.UF,
  rubik.EDGES.UB,
  rubik.CORNERS.URF,
  rubik.CORNERS.UBR,
  rubik.CORNERS.UFL,
  rubik.CORNERS.UBL,
];
Cube3D.FACE_NEIGHBORS[rubik.FACES.D] = [
  rubik.EDGES.DL,
  rubik.EDGES.DR,
  rubik.EDGES.DF,
  rubik.EDGES.DB,
  rubik.CORNERS.DFR,
  rubik.CORNERS.DRB,
  rubik.CORNERS.DLF,
  rubik.CORNERS.DBL,
];
Cube3D.FACE_NEIGHBORS[rubik.FACES.F] = [
  rubik.EDGES.UF,
  rubik.EDGES.DF,
  rubik.EDGES.FL,
  rubik.EDGES.RF,
  rubik.CORNERS.URF,
  rubik.CORNERS.DFR,
  rubik.CORNERS.UFL,
  rubik.CORNERS.DLF,
];
Cube3D.FACE_NEIGHBORS[rubik.FACES.B] = [
  rubik.EDGES.UB,
  rubik.EDGES.DB,
  rubik.EDGES.LB,
  rubik.EDGES.BR,
  rubik.CORNERS.UBR,
  rubik.CORNERS.DRB,
  rubik.CORNERS.UBL,
  rubik.CORNERS.DBL,
];

Cube3D.ROTATION = {};
Cube3D.ROTATION[rubik.MOVES.R] = { axis: Cube3D.axisX, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.L] = { axis: Cube3D.axisX, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.U] = { axis: Cube3D.axisY, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.D] = { axis: Cube3D.axisY, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.F] = { axis: Cube3D.axisZ, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.B] = { axis: Cube3D.axisZ, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Ri] = { axis: Cube3D.axisX, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Li] = { axis: Cube3D.axisX, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Ui] = { axis: Cube3D.axisY, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Di] = { axis: Cube3D.axisY, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Fi] = { axis: Cube3D.axisZ, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Bi] = { axis: Cube3D.axisZ, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.R2] = { axis: Cube3D.axisX, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.L2] = { axis: Cube3D.axisX, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.U2] = { axis: Cube3D.axisY, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.D2] = { axis: Cube3D.axisY, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.F2] = { axis: Cube3D.axisZ, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.B2] = { axis: Cube3D.axisZ, multiplier: 2};

Cube3D.INVERSE_ROTATION = {};
Cube3D.INVERSE_ROTATION[rubik.FACES.R] = rubik.FACES.Ri
Cube3D.INVERSE_ROTATION[rubik.FACES.L] = rubik.FACES.Li
Cube3D.INVERSE_ROTATION[rubik.FACES.U] = rubik.FACES.Ui
Cube3D.INVERSE_ROTATION[rubik.FACES.D] = rubik.FACES.Di
Cube3D.INVERSE_ROTATION[rubik.FACES.F] = rubik.FACES.Fi
Cube3D.INVERSE_ROTATION[rubik.FACES.B] = rubik.FACES.Bi

Cube3D.prototype.startAnimation = function(movement, steps) {
  this.animating = true;
  this._stepCount = 0;
  this._animationSteps = steps;
  this._attachCubiesToRotationNode(movement);
  this._rotation = Cube3D.ROTATION[movement];
}

Cube3D.prototype.update = function() {
  if (!this.animating) {
    return;
  }
  var angle = ((Math.PI / 2) * this._rotation.multiplier * this._stepCount++) / this._animationSteps;
  this._rotationNode.rotateOnAxis(this._rotation.axis, angle);
  if (this._stepCounter === this._animationSteps) {
    this.animating = false;
    this,_detachCubiesFromRotationNode();
  }
}

Cube3D.prototype._attachCubiesToRotationNode = function(face) {
  var neighbors = Cube3D.FACE_NEIGHBORS[face];
  var cubie = this._cubies[face];
  this._rotationNode.add(cubie);
  for (var i = 0; i < neighbors.length; i++) {
    cubie = this._cubies[neighbors[i]];
    // move the cubie to the rotating node
    this._rotationNode.add(cubie);
  }
}

Cube3D.prototype._detachCubiesFromRotationNode = function() {
  for (var i = 0; i < this._rotationNode.children.length; i++) {
    var cubie = this._rotationNode.children[i];
    // move the cubie back to the root node
    this.add(cubie);
  }
}

})();

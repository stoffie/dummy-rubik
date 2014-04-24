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

        //
        //if (!rubik.EDGES[cubie.rubikPosition] &&
        //    !rubik.FACES[cubie.rubikPosition]) {
        //  cubie.visible=0;
        //}
      }
    }
  }
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
Cube3D.ROTATION[rubik.MOVES.R] = { axis: Cube3D.axisX, multiplier: -1};
Cube3D.ROTATION[rubik.MOVES.L] = { axis: Cube3D.axisX, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.U] = { axis: Cube3D.axisY, multiplier: -1};
Cube3D.ROTATION[rubik.MOVES.D] = { axis: Cube3D.axisY, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.F] = { axis: Cube3D.axisZ, multiplier: -1};
Cube3D.ROTATION[rubik.MOVES.B] = { axis: Cube3D.axisZ, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Ri] = { axis: Cube3D.axisX, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Li] = { axis: Cube3D.axisX, multiplier: -1};
Cube3D.ROTATION[rubik.MOVES.Ui] = { axis: Cube3D.axisY, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Di] = { axis: Cube3D.axisY, multiplier: -1};
Cube3D.ROTATION[rubik.MOVES.Fi] = { axis: Cube3D.axisZ, multiplier: 1};
Cube3D.ROTATION[rubik.MOVES.Bi] = { axis: Cube3D.axisZ, multiplier: -1};
Cube3D.ROTATION[rubik.MOVES.R2] = { axis: Cube3D.axisX, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.L2] = { axis: Cube3D.axisX, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.U2] = { axis: Cube3D.axisY, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.D2] = { axis: Cube3D.axisY, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.F2] = { axis: Cube3D.axisZ, multiplier: 2};
Cube3D.ROTATION[rubik.MOVES.B2] = { axis: Cube3D.axisZ, multiplier: 2};

Cube3D.INVERSE_ROTATION = {};
Cube3D.INVERSE_ROTATION[rubik.MOVES.R] = rubik.MOVES.Ri
Cube3D.INVERSE_ROTATION[rubik.MOVES.L] = rubik.MOVES.Li
Cube3D.INVERSE_ROTATION[rubik.MOVES.U] = rubik.MOVES.Ui
Cube3D.INVERSE_ROTATION[rubik.MOVES.D] = rubik.MOVES.Di
Cube3D.INVERSE_ROTATION[rubik.MOVES.F] = rubik.MOVES.Fi
Cube3D.INVERSE_ROTATION[rubik.MOVES.B] = rubik.MOVES.Bi

Cube3D.prototype.startAnimation = function(face, movement, steps) {
  this.animating = true;
  this._movement = movement;
  this._stepCount = 0;
  this._animationSteps = steps;
  this._attachCubiesToRotationNode(face);
  this._rotation = Cube3D.ROTATION[movement];
  this._angle = ((Math.PI / 2) * this._rotation.multiplier) / this._animationSteps;
}

Cube3D.prototype.update = function() {
  if (!this.animating) {
    return;
  }
  this._rotationNode.rotateOnAxis(this._rotation.axis, this._angle);
  if (this._stepCount++ === this._animationSteps) {
    this.animating = false;
    this[this._movement]();
    this._propagateMovementToCubies();
    this._detachCubiesFromRotationNode();
    this._rotationNode.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
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
  var children = this._rotationNode.children.slice(0) // clone
  for (var i = 0; i < children.length; i++) {
    var cubie = children[i];
    // move the cubie back to the root node
    this.add(cubie);
  }
}

Cube3D.prototype._propagateMovementToCubies = function() {
  for (var i = 0; i < this._rotationNode.children.length; i++) {
    var cubie = this._rotationNode.children[i];
    // move the cubie faces
    cubie[this._movement]();
  }
}

Cube3D.prototype._moveCubies = function(e1, e2, e3, e4, c1, c2, c3, c4) {
  var cubies = this._cubies;
  var tmp = this._cubies[e1].material;
  cubies[e1].material = cubies[e2].material;
  cubies[e2].material = cubies[e3].material;
  cubies[e3].material = cubies[e4].material;
  cubies[e4].material = tmp;
  tmp = this._cubies[c1].material;
  cubies[c1].material = cubies[c2].material;
  cubies[c2].material = cubies[c3].material;
  cubies[c3].material = cubies[c4].material;
  cubies[c4].material = tmp;
};

Cube3D.prototype[rubik.MOVES.R] = function() {
  this._moveCubies(
    rubik.EDGES.UR,
    rubik.EDGES.RF,
    rubik.EDGES.DR,
    rubik.EDGES.BR,
    rubik.CORNERS.URF,
    rubik.CORNERS.DFR,
    rubik.CORNERS.DRB,
    rubik.CORNERS.UBR
  );
};

Cube3D.prototype[rubik.MOVES.L] = function() {
  this._moveCubies(
    rubik.EDGES.UL,
    rubik.EDGES.LB,
    rubik.EDGES.DL,
    rubik.EDGES.FL,
    rubik.CORNERS.UFL,
    rubik.CORNERS.UBL,
    rubik.CORNERS.DBL,
    rubik.CORNERS.DLF
  );
};

Cube3D.prototype[rubik.MOVES.U] = function() {
  this._moveCubies(
    rubik.EDGES.UF,
    rubik.EDGES.UR,
    rubik.EDGES.UB,
    rubik.EDGES.UL,
    rubik.CORNERS.URF,
    rubik.CORNERS.UBR,
    rubik.CORNERS.UBL,
    rubik.CORNERS.UFL
  );
};

Cube3D.prototype[rubik.MOVES.D] = function() {
  this._moveCubies(
    rubik.EDGES.DF,
    rubik.EDGES.DL,
    rubik.EDGES.DB,
    rubik.EDGES.DR,
    rubik.CORNERS.DFR,
    rubik.CORNERS.DLF,
    rubik.CORNERS.DBL,
    rubik.CORNERS.DRB
  );
};

Cube3D.prototype[rubik.MOVES.F] = function() {
  this._moveCubies(
    rubik.EDGES.UF,
    rubik.EDGES.FL,
    rubik.EDGES.DF,
    rubik.EDGES.RF,
    rubik.CORNERS.URF,
    rubik.CORNERS.UFL,
    rubik.CORNERS.DLF,
    rubik.CORNERS.DFR
  );
};

Cube3D.prototype[rubik.MOVES.B] = function() {
  this._moveCubies(
    rubik.EDGES.UB,
    rubik.EDGES.BR,
    rubik.EDGES.DB,
    rubik.EDGES.LB,
    rubik.CORNERS.UBR,
    rubik.CORNERS.DRB,
    rubik.CORNERS.DBL,
    rubik.CORNERS.UBL
  );
};

Cube3D.prototype[rubik.MOVES.Ri] = function() {
  this[rubik.MOVES.R]();
  this[rubik.MOVES.R]();
  this[rubik.MOVES.R]();
};

Cube3D.prototype[rubik.MOVES.Li] = function() {
  this[rubik.MOVES.L]();
  this[rubik.MOVES.L]();
  this[rubik.MOVES.L]();
};

Cube3D.prototype[rubik.MOVES.Ui] = function() {
  this[rubik.MOVES.U]();
  this[rubik.MOVES.U]();
  this[rubik.MOVES.U]();
};

Cube3D.prototype[rubik.MOVES.Di] = function() {
  this[rubik.MOVES.D]();
  this[rubik.MOVES.D]();
  this[rubik.MOVES.D]();
};

Cube3D.prototype[rubik.MOVES.Fi] = function() {
  this[rubik.MOVES.F]();
  this[rubik.MOVES.F]();
  this[rubik.MOVES.F]();
};

Cube3D.prototype[rubik.MOVES.Bi] = function() {
  this[rubik.MOVES.B]();
  this[rubik.MOVES.B]();
  this[rubik.MOVES.B]();
};

})();

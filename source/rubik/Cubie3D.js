(function(){

var Cubie3D = rubik.Cubie3D = function(geometry, materials) {
  THREE.Mesh.call(this, geometry, materials);
};

Cubie3D.prototype = Object.create(THREE.Mesh.prototype);

Cubie3D.MATERIALS = {};
// WARNING scrambled indexes
Cubie3D.MATERIALS[rubik.FACES.R] = 2;
Cubie3D.MATERIALS[rubik.FACES.L] = 1;
Cubie3D.MATERIALS[rubik.FACES.U] = 3;
Cubie3D.MATERIALS[rubik.FACES.D] = 4;
Cubie3D.MATERIALS[rubik.FACES.F] = 6;
Cubie3D.MATERIALS[rubik.FACES.B] = 5;

Cubie3D.prototype[rubik.MOVES.R] = Cubie3D.prototype[rubik.MOVES.Li] = function() {
  var i = Cubie3D.MATERIALS;
  var materials = this.material.materials.slice(0);
  var newMaterials = materials.slice(0);
  newMaterials[i[rubik.FACES.U]] = materials[i[rubik.FACES.F]];
  newMaterials[i[rubik.FACES.F]] = materials[i[rubik.FACES.D]];
  newMaterials[i[rubik.FACES.D]] = materials[i[rubik.FACES.B]];
  newMaterials[i[rubik.FACES.B]] = materials[i[rubik.FACES.U]];
  this.material.materials = newMaterials;
};

Cubie3D.prototype[rubik.MOVES.U] = Cubie3D.prototype[rubik.MOVES.Di] = function() {
  var i = Cubie3D.MATERIALS;
  var materials = this.material.materials.slice(0);
  var newMaterials = materials.slice(0);
  newMaterials[i[rubik.FACES.R]] = materials[i[rubik.FACES.F]];
  newMaterials[i[rubik.FACES.L]] = materials[i[rubik.FACES.B]];
  newMaterials[i[rubik.FACES.F]] = materials[i[rubik.FACES.L]];
  newMaterials[i[rubik.FACES.B]] = materials[i[rubik.FACES.R]];
  this.material.materials = newMaterials;
};

Cubie3D.prototype[rubik.MOVES.F] = Cubie3D.prototype[rubik.MOVES.Bi] = function() {
  var i = Cubie3D.MATERIALS;
  var materials = this.material.materials.slice(0);
  var newMaterials = materials.slice(0);
  newMaterials[i[rubik.FACES.R]] = materials[i[rubik.FACES.D]];
  newMaterials[i[rubik.FACES.D]] = materials[i[rubik.FACES.L]];
  newMaterials[i[rubik.FACES.L]] = materials[i[rubik.FACES.U]];
  newMaterials[i[rubik.FACES.U]] = materials[i[rubik.FACES.R]];
  this.material.materials = newMaterials;
};

Cubie3D.prototype[rubik.MOVES.L] = Cubie3D.prototype[rubik.MOVES.Ri] = function() {
  this[rubik.MOVES.R]();
  this[rubik.MOVES.R]();
  this[rubik.MOVES.R]();
};

Cubie3D.prototype[rubik.MOVES.D] = Cubie3D.prototype[rubik.MOVES.Ui] = function() {
  this[rubik.MOVES.U]();
  this[rubik.MOVES.U]();
  this[rubik.MOVES.U]();
};

Cubie3D.prototype[rubik.MOVES.B] = Cubie3D.prototype[rubik.MOVES.Fi] = function() {
  this[rubik.MOVES.F]();
  this[rubik.MOVES.F]();
  this[rubik.MOVES.F]();
};

Cubie3D.prototype[rubik.MOVES.R2] = function() {
  this[rubik.MOVES.R]();
  this[rubik.MOVES.R]();
};

Cubie3D.prototype[rubik.MOVES.L2] = function() {
  this[rubik.MOVES.L]();
  this[rubik.MOVES.L]();
};

Cubie3D.prototype[rubik.MOVES.U2] = function() {
  this[rubik.MOVES.U]();
  this[rubik.MOVES.U]();
};

Cubie3D.prototype[rubik.MOVES.D2] = function() {
  this[rubik.MOVES.D]();
  this[rubik.MOVES.D]();
};

Cubie3D.prototype[rubik.MOVES.F2] = function() {
  this[rubik.MOVES.F]();
  this[rubik.MOVES.F]();
};

Cubie3D.prototype[rubik.MOVES.B2] = function() {
  this[rubik.MOVES.B]();
  this[rubik.MOVES.B]();
};

})();

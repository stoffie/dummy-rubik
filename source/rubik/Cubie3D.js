(function(){

var Cubie3D = rubik.Cubie3D = function(geometry, materials) {
  THREE.Mesh.call(this, geometry, materials);
}

Cubie3D.prototype = Object.create(THREE.Mesh.prototype);

})();

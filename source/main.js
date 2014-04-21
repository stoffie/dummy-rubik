var rubik = {};

rubik.enumFromArray = function(array) {
  var obj = {};
  for (var i = 0; i < array.length; i++) {
    obj[array[i]] = array[i];
  }
  return obj;
}

rubik.EDGES = rubik.enumFromArray([
  'UF',
  'UL',
  'UB',
  'UR',
  'DF',
  'DL',
  'DB',
  'DR',
  'RF',
  'FL',
  'LB',
  'BR',
]);

rubik.CORNERS = rubik.enumFromArray([
  'URF',
  'UFL',
  'UBL',
  'UBR',
  'DFR',
  'DLF',
  'DBL',
  'DRB',
]);

rubik.FACES = rubik.enumFromArray([
  'R',
  'L',
  'U',
  'D',
  'F',
  'B',
]);

rubik.MOVES = rubik.enumFromArray([
  'R',
  'L',
  'U',
  'D',
  'F',
  'B',
  'Ri',
  'Li',
  'Ui',
  'Di',
  'Fi',
  'Bi',
  'R2',
  'L2',
  'U2',
  'D2',
  'F2',
  'B2',
]);

(function(){

var Cubie3D = rubik.Cubie3D = function(geometry, materials) {
  THREE.Mesh.call(this, geometry, materials);
}

Cubie3D.prototype = Object.create(THREE.Mesh.prototype);

})();

(function(){

var Cubie3D = rubik.Cubie3D;
var Cube3D = rubik.Cube3D = function(geometry, materials) {
  THREE.Object3D.call(this);
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
        this._cubies[Cube3D.cubiePosition[i]] = cubie;
        cubie.rubikPosition = Cube3D.cubiePosition[i];
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

Cube3D.AxisX = new THREE.Vector3(1, 0, 0);
Cube3D.AxisY = new THREE.Vector3(0, 1, 0);
Cube3D.AxisZ = new THREE.Vector3(0, 0, 1);

Cube3D.cubiePosition = [
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

Cube3D.faceNeighbors = {};
Cube3D.faceNeighbors[rubik.FACES.R] = [
  rubik.EDGES.UR,
  rubik.EDGES.DR,
  rubik.EDGES.RF,
  rubik.EDGES.BR,
  rubik.CORNERS.URF,
  rubik.CORNERS.UBR,
  rubik.CORNERS.DFR,
  rubik.CORNERS.DRB,
];
Cube3D.faceNeighbors[rubik.FACES.L] = [
  rubik.EDGES.UL,
  rubik.EDGES.DL,
  rubik.EDGES.FL,
  rubik.EDGES.LB,
  rubik.CORNERS.UFL,
  rubik.CORNERS.UBL,
  rubik.CORNERS.DLF,
  rubik.CORNERS.DBL,
];
Cube3D.faceNeighbors[rubik.FACES.U] = [
  rubik.EDGES.UL,
  rubik.EDGES.UR,
  rubik.EDGES.UF,
  rubik.EDGES.UB,
  rubik.CORNERS.URF,
  rubik.CORNERS.UBR,
  rubik.CORNERS.UFL,
  rubik.CORNERS.UBL,
];
Cube3D.faceNeighbors[rubik.FACES.D] = [
  rubik.EDGES.DL,
  rubik.EDGES.DR,
  rubik.EDGES.DF,
  rubik.EDGES.DB,
  rubik.CORNERS.DFR,
  rubik.CORNERS.DRB,
  rubik.CORNERS.DLF,
  rubik.CORNERS.DBL,
];
Cube3D.faceNeighbors[rubik.FACES.F] = [
  rubik.EDGES.UF,
  rubik.EDGES.DF,
  rubik.EDGES.FL,
  rubik.EDGES.RF,
  rubik.CORNERS.URF,
  rubik.CORNERS.DFR,
  rubik.CORNERS.UFL,
  rubik.CORNERS.DLF,
];
Cube3D.faceNeighbors[rubik.FACES.B] = [
  rubik.EDGES.UB,
  rubik.EDGES.DB,
  rubik.EDGES.LB,
  rubik.EDGES.BR,
  rubik.CORNERS.UBR,
  rubik.CORNERS.DRB,
  rubik.CORNERS.UBL,
  rubik.CORNERS.DBL,
];

Cube3D.rotations = {};
Cube3D.rotations[rubik.FACES.R] = { axis: Cube3D.AxisX, multiplier: 1};

Cube3D.prototype._attachCubiesToRotationNode = function(face) {
  var neighbors = Cube3D.faceNeighbors[face];
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

function onDocumentMouseDown(event)
{
  //console.log("mouse clicked!");
  event.preventDefault();
  if(event.target == renderer.domElement)
  {
    var mouseX = (event.clientX / window.innerWidth)*2-1;
    var mouseY = -(event.clientY /window.innerHeight)*2+1;

    var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
    var projector = new THREE.Projector();
    projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(cube3d.children, true);
    if ( intersects.length > 0 ) {
        console.log(intersects);
        /* do stuff */
    }
  }
}

var scene = new THREE.Scene();

var origin = new THREE.Vector3(0, 0, 0);

var CAMERA_DISTANCE = 10;
//var theta = 0;
//var phi = 0;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = CAMERA_DISTANCE;
camera.lookAt(origin);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
document.body.appendChild(renderer.domElement);

var render = function () {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//var light = new THREE.DirectionalLight( 0xffffff );
//light.position.set( 0, 0, 1 ).normalize();
//scene.add( light );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.noZoom = true;
controls.minPolarAngle = Math.PI / 6;
controls.maxPolarAngle = (Math.PI / 6) * 5;

var loader = new THREE.JSONLoader(true);
var cube3d;
loader.load("models/cubie.js", function(geometry, materials) {
  //materials[ 0 ].shading = THREE.FlatShading;
  //mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
  //mesh.position.set(0,0,0);
  //scene.add(mesh);
  //mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
  //mesh.position.set(-1*2,-1*2,-1*2);
  //scene.add(mesh);
  cube3d = new rubik.Cube3D(geometry, materials);
  scene.add(cube3d);
  render();
});

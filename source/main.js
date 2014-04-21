var rubik = {};

rubik.enumFromArray = function(array) {
  var obj = {};
  for (var i = 0; i < array.length; i++) {
    obj[array[i]] = array[i];
  }
  return obj;
}

rubik.cube = {};

rubik.cube.EDGES = rubik.enumFromArray([
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

rubik.cube.CORNERS = rubik.enumFromArray([
  'URF',
  'UFL',
  'UBL',
  'UBR',
  'DFR',
  'DLF',
  'DBL',
  'DRB',
]);

rubik.cube.FACES = rubik.enumFromArray([
  'R',
  'L',
  'U',
  'D',
  'F',
  'B',
]);

rubik.Cube3D = function(geometry, materials) {
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
        var cubie = new rubik.Cubie3D(geometry, new THREE.MeshFaceMaterial(materials));
        this._cubies[rubik.Cube3D.cubiePosition[i]] = cubie;
        cubie.rubikPosition = rubik.Cube3D.cubiePosition[i];
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

rubik.Cube3D.prototype = Object.create(THREE.Object3D.prototype);

rubik.Cube3D.cubiePosition = [
  rubik.cube.CORNERS.DBL, // -1, -1, -1
  rubik.cube.EDGES.DL, // -1, -1, 0
  rubik.cube.CORNERS.DLF, // -1, -1, +1
  rubik.cube.EDGES.LB, // -1, 0, -1
  rubik.cube.FACES.L, // -1, 0, 0
  rubik.cube.EDGES.FL, // -1, 0, +1
  rubik.cube.CORNERS.UBL, // -1, +1, -1
  rubik.cube.EDGES.UL, // -1, +1, 0
  rubik.cube.CORNERS.UFL, // -1, +1, +1
  rubik.cube.EDGES.DB, // 0, -1, -1
  rubik.cube.FACES.D, // 0, -1, 0
  rubik.cube.EDGES.DF, // 0, -1, +1
  rubik.cube.FACES.B, // 0, 0, -1
  // skip cubie 0, 0, 0
  rubik.cube.FACES.F, // 0, 0, +1
  rubik.cube.EDGES.UB, // 0, +1, -1
  rubik.cube.FACES.U, // 0, +1, 0
  rubik.cube.EDGES.UF, // 0, +1, +1
  rubik.cube.CORNERS.DRB, // +1, -1, -1
  rubik.cube.EDGES.DR, // +1, -1, 0
  rubik.cube.CORNERS.DFR, // +1, -1, +1
  rubik.cube.EDGES.BR, // +1, 0, -1
  rubik.cube.FACES.R, // +1, 0, 0
  rubik.cube.EDGES.RF, // +1, 0, +1
  rubik.cube.CORNERS.UBR, // +1, +1, -1
  rubik.cube.EDGES.UR, // +1, +1, 0
  rubik.cube.CORNERS.URF, // +1, +1, +1
];

rubik.Cube3D.facesNeighbor = {};
rubik.Cube3D.facesNeighbor[rubik.cube.FACES.R] = [
  rubik.cube.EDGES.UR,
  rubik.cube.EDGES.DR,
  rubik.cube.EDGES.RF,
  rubik.cube.EDGES.BR,
  rubik.cube.CORNERS.URF,
  rubik.cube.CORNERS.UBR,
  rubik.cube.CORNERS.DFR,
  rubik.cube.CORNERS.DRB,
];
rubik.Cube3D.facesNeighbor[rubik.cube.FACES.L] = [
  rubik.cube.EDGES.UL,
  rubik.cube.EDGES.DL,
  rubik.cube.EDGES.FL,
  rubik.cube.EDGES.LB,
  rubik.cube.CORNERS.UFL,
  rubik.cube.CORNERS.UBL,
  rubik.cube.CORNERS.DLF,
  rubik.cube.CORNERS.DBL,
];
rubik.Cube3D.facesNeighbor[rubik.cube.FACES.U] = [
  rubik.cube.EDGES.UL,
  rubik.cube.EDGES.UR,
  rubik.cube.EDGES.UF,
  rubik.cube.EDGES.UB,
  rubik.cube.CORNERS.URF,
  rubik.cube.CORNERS.UBR,
  rubik.cube.CORNERS.UFL,
  rubik.cube.CORNERS.UBL,
];
rubik.Cube3D.facesNeighbor[rubik.cube.FACES.D] = [
  rubik.cube.EDGES.DL,
  rubik.cube.EDGES.DR,
  rubik.cube.EDGES.DF,
  rubik.cube.EDGES.DB,
  rubik.cube.CORNERS.DFR,
  rubik.cube.CORNERS.DRB,
  rubik.cube.CORNERS.DLF,
  rubik.cube.CORNERS.DBL,
];
rubik.Cube3D.facesNeighbor[rubik.cube.FACES.F] = [
  rubik.cube.EDGES.UF,
  rubik.cube.EDGES.DF,
  rubik.cube.EDGES.FL,
  rubik.cube.EDGES.RF,
  rubik.cube.CORNERS.URF,
  rubik.cube.CORNERS.DFR,
  rubik.cube.CORNERS.UFL,
  rubik.cube.CORNERS.DLF,
];
rubik.Cube3D.facesNeighbor[rubik.cube.FACES.B] = [
  rubik.cube.EDGES.UB,
  rubik.cube.EDGES.DB,
  rubik.cube.EDGES.LB,
  rubik.cube.EDGES.BR,
  rubik.cube.CORNERS.UBR,
  rubik.cube.CORNERS.DRB,
  rubik.cube.CORNERS.UBL,
  rubik.cube.CORNERS.DBL,
];

rubik.Cube3D.prototype._attachCubiesToRotationNode = function(face) {
  var neighbors = rubik.Cube3D.facesNeighbor[face];
  var cubie = this._cubies[face];
  this._rotationNode.add(cubie);
  for (var i = 0; i < neighbors.length; i++) {
    cubie = this._cubies[neighbors[i]];
    // move the cubie to the rotating node
    this._rotationNode.add(cubie);
  }
}

rubik.Cube3D.prototype._detachCubiesFromRotationNode = function() {
  for (var i = 0; i < this._rotationNode.children.length; i++) {
    var cubie = this._rotationNode.children[i];
    // move the cubie back to the root node
    this.add(cubie);
  }
}

rubik.Cubie3D = function(geometry, materials) {
  THREE.Mesh.call(this, geometry, materials);
}

rubik.Cubie3D.prototype = Object.create(THREE.Mesh.prototype);

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

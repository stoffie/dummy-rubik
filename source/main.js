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
        console.log(intersects[0].object.rubikPosition);
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

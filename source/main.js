var cube3d;
var scene = new THREE.Scene();
var origin = new THREE.Vector3(0, 0, 0);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var render = function () {
  cube3d.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//var light = new THREE.DirectionalLight( 0xffffff );
//light.position.set( 0, 0, 10).normalize();
//scene.add( light );

var loader = new THREE.JSONLoader(true);

loader.load("models/cubie.js", function(geometry, materials) {
  cube3d = new rubik.Cube3D(geometry, materials);
  scene.add(cube3d);
  var controls = new rubik.CubeControls(camera, cube3d, renderer.domElement);
  controls.minPhi = Math.PI / 6;
  controls.maxPhi = (Math.PI / 6) * 5;
  controls.radius = 10;
  controls.phi = Math.PI / 3;
  controls.theta = Math.PI / 4;
  controls.animationSteps = 10;
  controls.updateCameraPosition();
  render();
});

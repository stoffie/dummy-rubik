rubik.CubeControls = function(camera, cube3d, domElement) {
  var scope = this;

  this.camera = camera;
  this.cube3d = cube3d;
  this.domElement = domElement;

  this.speed = 0.01;
  this.minPolarAngle = 0; // radians
  this.maxPolarAngle = Math.PI; // radians

  var phi = Math.PI / 2;
  var theta = 0;

  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();

  var onMouseDown = function(event) {
    event.preventDefault();
    rotateStart.set(event.clientX, event.clientY);
    scope.domElement.addEventListener('mousemove', onMouseMove, false );
    scope.domElement.addEventListener('mouseup', onMouseUp, false );
  }

  function onMouseMove(event) {
    event.preventDefault();
    rotateEnd.set(event.clientX, event.clientY);
    rotateDelta.subVectors(rotateEnd, rotateStart);

    var radius = 10;

    theta -= rotateDelta.x * scope.speed;

    phi -= rotateDelta.y * scope.speed;
    // restrict phi to be between desired limits
    phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, phi));

    camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
    camera.position.y = radius * Math.cos(phi);
    camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
    camera.lookAt(cube3d.position);

    rotateStart.copy(rotateEnd);
  }

  var onMouseUp = function() {
    scope.domElement.removeEventListener('mousemove', onMouseMove, false);
    scope.domElement.removeEventListener('mouseup', onMouseUp, false);
  }

  this.domElement.addEventListener('mousedown', onMouseDown, false);
  this.domElement.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  }, false );
};

rubik.CubeControls.prototype.updateCameraPosition = function() {
}

rubik.CubeControls = function(camera, cube3d, domElement) {
  var scope = this;

  this.camera = camera;
  this.cube3d = cube3d;
  this.domElement = domElement;

  this.radius = 1;
  this.speed = 0.01;
  this.minPhi = 0; // radians
  this.maxPhi = Math.PI; // radians
  this.animationSteps = 5;

  // watch the front face of the cube
  this.phi = Math.PI / 2;
  this.theta = 0;

  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();

  var onMouseDown = function(event) {
    event.preventDefault();
    var cubie = scope._castPickRay(event);
    if (cubie &&
        rubik.FACES[cubie.rubikPosition] !== undefined &&
        !scope.cube3d.animating) {
      // perform animation
      var face = cubie.rubikPosition;
      var movement;
      if (event.button == 0) {
        movement = cubie.rubikPosition;
      } else {
        movement = rubik.Cube3D.INVERSE_ROTATION[cubie.rubikPosition];
      }
      scope.cube3d.startAnimation(face, movement, scope.animationSteps);
    } else {
      // drag the camera around
      rotateStart.set(event.clientX, event.clientY);
      scope.domElement.addEventListener('mousemove', onMouseMove, false );
      scope.domElement.addEventListener('mouseup', onMouseUp, false );
    }
  }

  var onMouseMove = function(event) {
    event.preventDefault();
    rotateEnd.set(event.clientX, event.clientY);
    rotateDelta.subVectors(rotateEnd, rotateStart);
    scope.theta -= rotateDelta.x * scope.speed;
    scope.phi -= rotateDelta.y * scope.speed;
    // restrict phi to be between desired limits
    scope.phi = Math.min(scope.maxPhi, scope.phi);
    scope.phi = Math.max(scope.minPhi, scope.phi);
    scope.updateCameraPosition();
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
  this.camera.position.x = this.radius * Math.sin(this.phi) * Math.sin(this.theta);
  this.camera.position.y = this.radius * Math.cos(this.phi);
  this.camera.position.z = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
  this.camera.lookAt(this.cube3d.position);
}

rubik.CubeControls.prototype._castPickRay = function(event) {
  var mouseX = (event.clientX / window.innerWidth)*2-1;
  var mouseY = -(event.clientY /window.innerHeight)*2+1;
  var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
  var projector = new THREE.Projector();
  projector.unprojectVector(vector, camera);
  vector.sub(this.camera.position).normalize()
  var raycaster = new THREE.Raycaster(this.camera.position, vector);
  var intersects = raycaster.intersectObjects(cube3d.children, true);
  if ( intersects.length > 0 ) {
      return intersects[0].object;
  }
  return null;
}

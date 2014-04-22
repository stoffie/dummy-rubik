/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//    	controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.

THREE.OrbitControls = function ( object, domElement ) {
	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	// "target" sets the location of focus, where the control orbits around
	// and where it pans with respect to.
	this.target = new THREE.Vector3();
	this.rotateSpeed = 1.0;
	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians
	////////////
	// internals
	var scope = this;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var offset = new THREE.Vector3();

	var phiDelta = 0;
	var thetaDelta = 0;
	var scale = 1;

	this.update = function () {
		var position = this.object.position;
		offset.copy( position ).sub( this.target );
		// angle from z-axis around y-axis
		var theta = Math.atan2( offset.x, offset.z );
		// angle from y-axis
		var phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );
		theta += thetaDelta;
		phi += phiDelta;
		// restrict phi to be between desired limits
		phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );
		var radius = offset.length() * scale;
		offset.x = radius * Math.sin( phi ) * Math.sin( theta );
		offset.y = radius * Math.cos( phi );
		offset.z = radius * Math.sin( phi ) * Math.cos( theta );
		position.copy( this.target ).add( offset );
		this.object.lookAt( this.target );
		thetaDelta = 0;
		phiDelta = 0;
		scale = 1;
	};

	function onMouseDown( event ) {
		event.preventDefault();
		rotateStart.set( event.clientX, event.clientY );
    scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
		scope.domElement.addEventListener( 'mouseup', onMouseUp, false );
	}

	function onMouseMove( event ) {
		event.preventDefault();
		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
		rotateEnd.set( event.clientX, event.clientY );
		rotateDelta.subVectors( rotateEnd, rotateStart );
		// rotating across whole screen goes 360 degrees around
		var angle = ( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
		thetaDelta -= angle;
		// rotating up and down along whole screen attempts to go 360, but limited to 180
		angle = ( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
		phiDelta -= angle;
		rotateStart.copy( rotateEnd );
    scope.update();
	}

	function onMouseUp( /* event */ ) {
		scope.domElement.removeEventListener( 'mousemove', onMouseMove, false );
		scope.domElement.removeEventListener( 'mouseup', onMouseUp, false );
	}

  this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );
};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );

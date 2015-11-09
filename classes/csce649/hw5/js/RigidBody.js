/* global THREE, doc, Util */

/** 
 *  Rigid body class.
 */

var START_X = new THREE.Vector3(0,0,0);
var START_V = new THREE.Vector3(0,0,0);

function RigidBody(scene, callback, fish){ 
    
    if (fish){
        var loader = new THREE.JSONLoader();
        loader.load( "js/bass_reduced.js", function( geometry ) {
            this.mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial( /*{ wireframe: true }*/ ) );
            this.mesh.scale.set(1, 1, 1);

            this.count = this.mesh.geometry.vertices.length;
            this.STATE = new Array(this.count * 2);
			
            for (var i = 0; i < this.count; i++) {
                //scale the mesh
                this.mesh.geometry.vertices[i].x *= 100;
                this.mesh.geometry.vertices[i].y *= 100;
                this.mesh.geometry.vertices[i].z *= 100;
                this.mesh.geometry.vertices[i].mass = 0.1;

                this.STATE[i] = new THREE.Vector3(
                    this.mesh.geometry.vertices[i].x,
                    this.mesh.geometry.vertices[i].y,
                    this.mesh.geometry.vertices[i].z
                );
                this.STATE[i + this.count] = new THREE.Vector3(0,0,0);
            }
            this.mesh.geometry.computeFaceNormals();
            Util.addStruts(this.mesh);
            scene.add(this.mesh);
            callback();
        }.bind(this) );
    }
    else {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        geometry.rotateX(1);
        geometry.rotateY(1);
        geometry.rotateZ(1);

        this.mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial( /*{ wireframe: true }*/ ) );
        this.mesh.scale.set(1, 1, 1);

        this.count = this.mesh.geometry.vertices.length;
        this.STATE = new Array(this.count * 2);

        for (var i = 0; i < this.count; i++) {
            //scale the mesh
            this.mesh.geometry.vertices[i].x *= 10;
            this.mesh.geometry.vertices[i].y *= 10;
            this.mesh.geometry.vertices[i].z *= 10;
            this.mesh.geometry.vertices[i].mass = 0.5;

            this.STATE[i] = new THREE.Vector3(
                this.mesh.geometry.vertices[i].x,
                this.mesh.geometry.vertices[i].y,
                this.mesh.geometry.vertices[i].z
            );
            this.STATE[i + this.count] = new THREE.Vector3(0,0,0);
        }
        this.mesh.geometry.computeFaceNormals();    
        Util.addStruts(this.mesh);
        scene.add(this.mesh);
    }

}

/** remove the particle system */
RigidBody.prototype.delete = function(scene){
    scene.remove(this.mesh);
};

/** update all th particles to the right position from the state */
RigidBody.prototype.moveParticles = function(){  
    for (var i = 0; i < this.count; i++){
        this.mesh.geometry.vertices[i].copy(this.STATE[i]);
    }
};

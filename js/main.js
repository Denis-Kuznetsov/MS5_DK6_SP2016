function StartRender()
{
  var A = new anim();

  A.MainCamera.position.z = 5;
  A.AddMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial( { color: 0xff0000 } ), function(mesh){mesh.rotation.set(A.time, A.time, 0)});

  A.Start();
}

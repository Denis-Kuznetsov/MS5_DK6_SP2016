function StartRender()
{
  var A = new anim();

  /* Envi cube texture */
  var enviurls = ["textures/px.jpg", "textures/nx.jpg", "textures/py.jpg", "textures/ny.jpg", "textures/pz.jpg", "textures/nz.jpg"];
  var enviloader = new THREE.CubeTextureLoader();
  var envitex = enviloader.load(enviurls);
  var envishad = THREE.ShaderLib["cube"];
  envishad.uniforms["tCube"].value = envitex;
  var envimtl = new THREE.ShaderMaterial({
    fragmentShader: envishad.fragmentShader,
    vertexShader: envishad.vertexShader,
    uniforms: envishad.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });
  A.AddMesh(new THREE.BoxGeometry(100, 100, 100), envimtl, function ()
  {
  });

  A.MainCamera.position.z = 5;
  A.AddMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
    function(mesh){
      mesh.rotation.set(A.time, A.time, 0);
      mesh.position.set(Math.sin(A.time), Math.sin(A.time + 3.14 / 2), 0);
    });

  A.Start();
}

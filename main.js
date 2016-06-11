var Sc = new screentracker();
  CameraCapture();
  Sc.TrackColor();

  var A = new anim(Sc);

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

  A.AddMesh(new THREE.BoxGeometry(1000, 1000, 1000), envimtl, function ()
  {
  });

  A.MainCamera.position.z = 20;
  A.MainCamera.position.y = 3;

  /*A.LoadObj("makartable.obj", "makartable.mtl", function(object){
    object.rotation.set(3.14 / 2, 0, 0);
    object.scale.set(3, 3, 3);
  });*/


  var b = new ball(new THREE.Vector3(0, 1, 0), new THREE.Vector3(.3, .3, 0), 0, .01, 1);
  A.AddMesh(new THREE.SphereGeometry(1, 10, 10), new THREE.MeshBasicMaterial({color: 0xff0000}), function (mesh){
    var t = Date.now() - A.start;
    b.Move(A.time);
    if (Math.floor(t) - Math.floor(A.time) != 0)
      document.getElementById("log1").innerHTML = "POS:" + "_"+b.Position.y+"_";
    document.getElementById("log2").innerHTML = "   VEL:"+"_"+b.Velocity.y+"_";
    document.getElementById("log").innerHTML += "   STARTPOS:"+"_"+b.StartPosition.y+"_";
    mesh.position.set(b.Position.x, b.Position.y, b.Position.z);
  });
  A.Start();
  
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

  A.AddMesh(new THREE.BoxGeometry(1000, 1000, 1000), envimtl, function (mesh)
  {
    mesh.position.set(A.MainCamera.position.x, A.MainCamera.position.y, A.MainCamera.position.z);
  });

  A.AddMesh(new THREE.BoxGeometry(5, 5, .01), new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(0, 5, -4.05);
  });

  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(-2.3, 7.5, -4.05);
  });
  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(2.3, 7.5, -4.05);
  });
  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(-2.3, 2.8, -4.05);
  });
  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(2.3, 2.8, -4.05);
  });

  A.AddMesh(new THREE.SphereGeometry(.1, 100, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(2.3, 2.8, -4.05);
  });

  A.AddMesh(new THREE.PlaneGeometry(.01, .01, 100), new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide}), function (mesh)
  {
    mesh.position.set(A.BattledoreLT.x, A.BattledoreLT.y, A.BattledoreLT.z);
  });

  A.MainCamera.position.z = 10;
  A.MainCamera.position.y = 5;

  A.LoadObj("makartable.obj", "makartable.mtl", function(object){
    object.rotation.set(3.14 / 2, 0, 0);
    object.position.set(0, 0, 0);
    //object
    object.scale.set(3, 3, 3);
  });

  var R = .2;
  var b = new ball(
              /* Ball data       */    new THREE.Vector3(0, 10, 4.05), new THREE.Vector3(0, -0.05, -0.09), .01, R, 40,
              /* Table data      */    new THREE.Vector3(-2.3, 2.4, 4.05), new THREE.Vector3(4.6, 0, 8.1),
              /* Battledore data */    new THREE.Vector3(-2.3, 2.8, -4.05), new THREE.Vector3(4.6, 7.5 - 2.8, 0),
                                       new THREE.Vector3(-2.3, 2.8, 4.05), new THREE.Vector3(4.6, 7.5 - 2.8, 0));
  
  A.AddMesh(new THREE.SphereGeometry(R, 100, 100), new THREE.MeshBasicMaterial({color: 0xff0000}), function (mesh){

    document.getElementById("log").innerHTML = "Battledore:  [" + A.BattledoreLT.x + "]  [" + A.BattledoreLT.y + "]  [" + A.BattledoreLT.z + "]";
    document.getElementById("log1").innerHTML = "Right:  [" + A.MainCameraRight.x + "]  [" + A.MainCameraRight.y + "]  [" + A.MainCameraRight.z + "]";
    document.getElementById("log2").innerHTML = "Up:  [" + A.MainCameraUp.x + "]  [" + A.MainCameraUp.y + "]  [" + A.MainCameraUp.z + "]";
    document.getElementById("log3").innerHTML = "DeltaCoord:  [" + A.deltacoordpx.x + "]  [" + A.deltacoordpx.y + "]";
    document.getElementById("log4").innerHTML = "px:  [" + A.tr.X + "]  [" + A.ScreenW + "]";

    mesh.position.set(0, -3, 0);
    b.Move(A.time);
    mesh.position.set(b.Position.x, b.Position.y, b.Position.z);

    if (mesh.position.y < -3)
        A.MainScene.remove(mesh);
  });
  A.Start();
  
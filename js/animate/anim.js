function unit(nmesh, response_func)
{
  this.Mesh = nmesh;
  this.ResponseFunc = function(mesh){response_func(mesh)};
}

function anim(ntr) {
  var self = this;

  // Camera debug flight
  var camL, camR;
  var camU, camD;
  var goF, goB;
  var goL, goR;
  var goC, goSp;
  window.onkeydown = function(e) {
    if (e.keyCode === 39)
      camL = 1;
    else if (e.keyCode === 37)
      camR = 1;
    else if (e.keyCode === 38)
      camU = 1;
    else if (e.keyCode === 40)
      camD = 1;
    if (e.keyCode === 68)
      goR = 1;
    else if (e.keyCode === 65)
      goL = 1;
    else if (e.keyCode === 87)
      goF = 1;
    else if (e.keyCode === 83)
      goB = 1;
    else if (e.keyCode === 67)
      goC = 1;
    else if (e.keyCode === 32)
      goSp = 1;
  };

  window.onkeyup = function (e){
    if (e.keyCode === 39)
      camL = 0;
    else if (e.keyCode === 37)
      camR = 0;
    else if (e.keyCode === 38)
      camU = 0;
    else if (e.keyCode === 40)
      camD = 0;
    if (e.keyCode === 68)
      goR = 0;
    else if (e.keyCode === 65)
      goL = 0;
    else if (e.keyCode === 87)
      goF = 0;
    else if (e.keyCode === 83)
      goB = 0;
    else if (e.keyCode === 67)
      goC = 0;
    else if (e.keyCode === 32)
      goSp = 0;
  };

  self.start = Date.now();

  if (ntr != undefined)
    this.tr = ntr;

  var render_canvas = document.getElementById("render_canvas");
  self.Units = [];
  self.MainScene = new THREE.Scene();
  self.MainCamera = new THREE.PerspectiveCamera(75, render_canvas.width / render_canvas.height, 0.1, 1000);
  self.MainRenderer = new THREE.WebGLRenderer({canvas: render_canvas, antialias: true});
  self.MainRenderer.setSize(render_canvas.width, render_canvas.height);
  self.time = 0;
  document.body.appendChild(self.MainRenderer.domElement);

  self.AddMesh = function (geometry, material, response_func) {
    mesh = new THREE.Mesh(geometry, material);
    self.Units.push(new unit(mesh, response_func));
    self.MainScene.add(mesh);
  };

  self.AddLight = function (light, npos) {
    var l = light;
    l.pos = npos;
    self.MainScene.add(l);
  };

  self.Render = function () {
    var oldtime = self.time;
    self.time = (Date.now() - self.start) / 1000.0;

    if (self.tr != undefined)
    {
      document.getElementById("log").innerHTML = self.tr.X + ";" + self.tr.Y;
      //self.MainCamera.position.set(0, 0, self.tr. X / 10.0);
    }

    for (var i = 0; i < (self.Units).length; i++)
      self.Units[i].ResponseFunc(self.Units[i].Mesh);
    (self.MainRenderer).render(self.MainScene, self.MainCamera);

    if (camR)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x, self.MainCamera.rotation.y + 0.05, self.MainCamera.rotation.z);
    if (camL)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x, self.MainCamera.rotation.y - 0.05, self.MainCamera.rotation.z);
    if (camU)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x + 0.05, self.MainCamera.rotation.y, self.MainCamera.rotation.z);
    if (camD)
      self.MainCamera.rotation.set(self.MainCamera.rotation.x - 0.05, self.MainCamera.rotation.y, self.MainCamera.rotation.z);

    if (goF)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y, self.MainCamera.position.z - 0.05);
    if (goB)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y, self.MainCamera.position.z + 0.05);
    if (goL)
      self.MainCamera.position.set(self.MainCamera.position.x - 0.05, self.MainCamera.position.y , self.MainCamera.position.z);
    if (goR)
      self.MainCamera.position.set(self.MainCamera.position.x + 0.05, self.MainCamera.position.y , self.MainCamera.position.z);
    if (goC)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y - 0.05, self.MainCamera.position.z);
    if (goSp)
      self.MainCamera.position.set(self.MainCamera.position.x, self.MainCamera.position.y + 0.05, self.MainCamera.position.z);
  };

  self.Start = function () {
    self.Render();
    window.requestAnimationFrame(self.Start);
  };

  self.LoadObj = function (objfile, mtlfile, objfunc) {

    var manager = new THREE.LoadingManager();
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'objects/' );
    mtlLoader.load( 'makartable.mtl', function( materials ) {
      materials.preload();
      var loader = new THREE.OBJLoader( manager );
      loader.setMaterials(materials);
      loader.setPath( 'objects/' );
      loader.load( 'makartable.obj', function ( object ) {
        objfunc(object);
        self.MainScene.add(object);
      } );
    });
  };
}



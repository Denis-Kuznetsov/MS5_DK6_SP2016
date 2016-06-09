function unit(nmesh, response_func)
{
  this.Mesh = nmesh;
  this.ResponseFunc = function(mesh){response_func(mesh)};
}

function anim(ntr) {
  var self = this;

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

    if (Math.floor(oldtime) != Math.floor(self.time) && self.tr != undefined)
      console.log(self.tr.trackX);

    for (var i = 0; i < (self.Units).length; i++)
      self.Units[i].ResponseFunc(self.Units[i].Mesh);
    (self.MainRenderer).render(self.MainScene, self.MainCamera);

  };

  self.Start = function () {
    self.Render();
    window.requestAnimationFrame(self.Start);
  };

  self.LoadObj = function () {
    var manager = new THREE.LoadingManager();

    manager.onProgress = function ( item, loaded, total ) {
      console.log( item, loaded, total );
    };

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'objects/farmhouse.obj', function ( object ) {
      scene.add(object);
    });

  };
}



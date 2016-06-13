function tennis(NBallRadius, NGravity, NTimeBoost, NPlanes)
{
    self.start = Date.now();

    var vm = new vecmath();
    
    this.BallRadius = NBallRadius;
    this.Gravity = NGravity;
    this.TimeBoost = NTimeBoost;    
    this.Planes = NPlanes;

    this.ball;
}

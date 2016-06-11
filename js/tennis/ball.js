function ball (Pos, Vel, Pl, Grav, R)
{
    var self = this;

    self.Radius = R;
    self.StartPosition = Pos;
    self.StartVelocity = Vel;
    self.Gravity = Grav;

    self.Position = self.StartPosition;
    self.Velocity = self.StartVelocity;

    self.Plane = Pl;
    function Sum(a, b)
    {
        var res = new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
        return res;
    }

    function Mul(a, b)
    {
        var res = new THREE.Vector3(a.x * b, a.y * b, a.z * b);
        return res;
    }

    self.Move = function(deltaTime) {
        deltaTime *= 10;

        if (self.Position.y - R <= self.Plane)
        {
            //self.StartPosition = self.Position;
            self.StartVelocity = new THREE.Vector3(self.Velocity.x, -self.Velocity.y, self.Velocity.z);
        }

        /* REAL PHYSICS */
        var g = new THREE.Vector3(0, -self.Gravity, 0);
        self.Position = Sum(Sum(self.StartPosition, Mul(self.StartVelocity, deltaTime)), Mul(g, deltaTime * deltaTime / 2));
        self.Velocity = Sum(self.StartVelocity, Mul(g, deltaTime));
        /* FAKE PHYSICS */
        /*
        deltaTime *= .2;
        if (self.Position.y <= self.Plane) {
            self.StartPosition = new THREE.Vector3(self.Position.x, self.Position.y, self.Position.z);
            self.Velocity = new THREE.Vector3(self.Velocity.x, -self.Velocity.y, self.Velocity.z);
        }

        self.Velocity.y -= self.Gravity * deltaTime;
        //self.Position = Sum(self.StartPosition, Mul(self.Velocity, deltaTime));
        self.Position.x = self.Position.x + self.Velocity.x * deltaTime;
        self.Position.y = self.Position.y + self.Velocity.y * deltaTime;
        self.Position.z = self.Position.z + self.Velocity.z * deltaTime;
*/
    };
}

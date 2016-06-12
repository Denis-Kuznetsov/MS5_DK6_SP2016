function ball (Pos, Vel, Grav, R, timeboost, TableP, TableS, B1P, B1S, B2P, B2S)
{
    var self = this;

    self.Radius = R;
    self.StartPosition = Pos;
    self.StartVelocity = Vel;
    self.Gravity = Grav;
    
    self.TablePos = TableP;
    self.TableSize = TableS;

    self.Battledore1Pos = B1P;
    self.Battledore1Size = B1S;

    self.Battledore2Pos = B2P;
    self.Battledore2Size = B2S;

    self.start = Date.now();

    self.ElapsedTime = 0;
    self.RefV = self.StartVelocity;

    self.Position = self.StartPosition;
    self.Velocity = self.StartVelocity;
    self.ElapsedTime = (Date.now() - self.start) / 1000.0;
    
    function Sum(a, b)
    {
        var res = new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
        return res;
    }

    function Sub(a, b)
    {
        var res = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
        return res;
    }

    function Mul(a, b)
    {
        var res = new THREE.Vector3(a.x * b, a.y * b, a.z * b);
        return res;
    }

    function Dot(a, b)
    {
        var res = a.x * b.x + a.y * b.y + a.z * b.z;

        return res;
    }

    self.Move = function() {
        var norm = new THREE.Vector3(0, 0, 1);

        /* Collision with table*/
        if (self.Position.y - self.Radius < self.TablePos.y && self.Position.x >= self.TablePos.x && self.Position.x <= self.TablePos.x + self.TableSize.x
                                                       && self.Position.z < self.TablePos.z && self.Position.z > self.TablePos.z - self.TableSize.z)
        {
            self.Position.y = self.TablePos.y + self.Radius;
            self.StartPosition = self.Position;
            self.StartVelocity = new THREE.Vector3(self.Velocity.x, -(self.Velocity.y + 0.0025), self.Velocity.z);

            self.start = Date.now();
        }
        /* Collision with wall1 */
        if (self.Position.z - self.Radius < self.Battledore1Pos.z && self.Position.x >= self.Battledore1Pos.x && self.Position.x <= self.Battledore1Pos.x + self.Battledore1Size.x
                                                                  && self.Position.y >= self.Battledore1Pos.y && self.Position.y <= self.Battledore1Pos.y + self.Battledore1Size.y)
        {
            self.Position.z = self.Battledore1Pos.z + self.Radius;
            self.StartPosition = self.Position;
            self.StartVelocity = Sub(self.Velocity, Mul(norm, 2 * Dot(self.Velocity, norm)));

            self.start = Date.now();
        }
        /* Collision with wall2 */
        if (self.Position.z + self.Radius > self.Battledore2Pos.z)
        {
            self.Position.z = self.Battledore2Pos.z - self.Radius;
            self.StartPosition = self.Position;            
            self.StartVelocity = Sub(self.Velocity, Mul(norm, 2 * Dot(self.Velocity, norm)));

            self.start = Date.now();
        }


        self.ElapsedTime = (Date.now() - self.start) / 1000.0;

        var g = new THREE.Vector3(0, -self.Gravity, 0);
        self.Position = Sum(Sum(self.StartPosition, Mul(self.StartVelocity, self.ElapsedTime * timeboost)), Mul(g, self.ElapsedTime * self.ElapsedTime * timeboost * timeboost / 2));
        self.Velocity = Sum(self.StartVelocity, Mul(g, self.ElapsedTime * timeboost));
    };
}

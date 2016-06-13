function vecmath()
{
    this.Sum = function (a, b)
    {
        var res = new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
        return res;
    };

    this.Sub = function (a, b)
    {
        var res = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
        return res;
    };

    this.Mul = function (a, b)
    {
        var res = new THREE.Vector3(a.x * b, a.y * b, a.z * b);
        return res;
    };

    this.Dot = function (a, b)
    {
        var res = a.x * b.x + a.y * b.y + a.z * b.z;

        return res;
    };

    this.Cross = function (a, b)
    {
        var res = new THREE.Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

        return res;
    };

    /* Mathematics part */
    function TriArea2D(x1, y1, x2, y2, x3, y3)
    {
        return (x1 - x2) * (y2 - y3) - (x2 - x3) * (y1 - y2);
    }

    function Barycentric(a, b, c, p)
    {
        var m = Cross(Sub(b, a), Sub(c, a));

        var nu, nv, ood;

        var x = Math.abs(m.x), y = Math.abs(m.y), z = Math.abs(m.z);

        if (x >= y && x >= z)
        {
            nu = TriArea2D(p.y, p.z, b.y, b.z, c.y, c.z);
            nv = TriArea2D(p.y, p.z, c.y, c.z, a.y, a.z);
            ood = 1.0 / m.x;
        }
        else if (y >= x && y >= z)
        {
            nu = TriArea2D(p.x, p.z, b.x, b.z, c.x, c.z);
            nv = TriArea2D(p.x, p.z, c.x, c.z, a.x, a.z);
            ood = 1.0 / -m.y;
        }
        else
        {
            nu = TriArea2D(p.x, p.y, b.x, b.y, c.x, c.y);
            nv = TriArea2D(p.x, p.y, c.x, c.y, a.x, a.y);
            ood = 1.0 / m.z;
        }
        return
        {
            u: nu * ood;
            v: nv * ood;
            w: 1.0 - u - v;
        };
    }

    this.TestPointTriangle = function(p, a, b, c)
    {
        var u, v, w;
        var res = Barycentric(a, b, c, p);
        return res.v >= 0.0 && res.w >= 0.0 && (res.v + res.w) <= 1.0;
    }

}

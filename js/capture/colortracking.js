function screentracker ()
{
  var self = this;

  self.trackX = 0;
  self.trackY = 0;
  self.trackW = 0;
  self.trackH = 0;
     
  self.TrackColor = function()
  {
    var colors = new tracking.ColorTracker(["magenta"]);

    colors.on('track', function (e)
    {
      if (e.data.length === 0)
        console.log('Cannot find any color');
      else
      {
        e.data.forEach(function (rect)
        {
          self.trackX = rect.x;
          self.trackY = rect.y;
          self.trackW = rect.width;
          self.trackH = rect.height;
        })
      }
    });

    tracking.track("#video", colors);
  }
}
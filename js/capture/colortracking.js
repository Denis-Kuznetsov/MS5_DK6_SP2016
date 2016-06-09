function TrackColor()
{
  var colors = new tracking.ColorTracker(["magenta"]);

  colors.on('track', function (e)
  {
    if (e.data.length === 0)
      console.log('Cannot find any color')
    else
    {
      e.data.forEach(function (rect)
      {
        console.log(rect.x, rect.y, rect.width, rect.height, rect.color);
      })
    }
  });

  tracking.track("#video", colors);
}
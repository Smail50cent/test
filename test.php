<!DOCTYPE html>
<html>
    <head>
        <script type=text/javascript>
function draw() {
    var canvas = document.getElementById("canvas");
    var ctx2 = canvas.getContext("2d");
    ctx2.fillStyle = "rgb(8,255,255)";
    ctx2.fillRect(0, -10, 500, 500);
    var horiz = 10;
    var vertic = 10;
    var off = 0;
    for (var i = 0; i < 3; i++) {
        console.log(off);
        var ctx1 = canvas.getContext("2d");
        ctx1.fillStyle = "red";
        ctx1.fillRect(horiz, vertic * (i * 4), 60, 32);
        
    }
}
        </script>
    </head>
    <body onload="draw()">
        <div id="dr" class=" dr_structure dr_personalize"></div>
        <canvas id="canvas" class="canvas_structure canva_personalize" width="300" height="300"></canvas>
    </body>
</html>
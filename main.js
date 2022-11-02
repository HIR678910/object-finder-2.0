status = " ";
object = [];

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture();
    video.hide();


}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status_1").innerHTML = "Status: Detecting Objects"
    name = document.getElementById("input").value;
}

function modelloaded()
{
    console.log("Model Loaded!");
    status = true;

}

function draw()
{
    image(video, 0, 0, 480, 380);
    if( status != "")
    {
      objectDetector.detect(video, gotresults);
      for(i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML = "Status : objects detected";
        fill("#f27949");
        percent = (objects[i].confidence *100);
        text(objects[i].labe + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#f27949");
        rect( objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == name)
        {
            video.stop();
            objectDetector.detect(gotresults);
            document.getElementById("status").innerHTML = name + "Found";
            S = window.speechSynthesis;
            U = new SpeechSynthesisUtterance(name + "found");
            S.speak(U);
        }
        else{
            document.getElementById("status").innerHTML = name + "Not Found";
        }
      }
    }
}

function gotresults(error , results)
{
  if(error ){
    console.error(error);
  }
  console.log(results);
  object = results;
}


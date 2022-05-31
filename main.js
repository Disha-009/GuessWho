function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier('MobileNet', modelLoaded);
}


function modelLoaded(){
  console.log('model loaded');

}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}
var previousResult= ' ';



function gotResult(error, result){
if (error){

  console.error(error);

}
 else {
 if ((result[0].confidence>0.5 ) && (previousResult!= result[0].label)){
   console.log(result);
   previousResult= result[0].label;
   synth= window.speechSynthesis;
   speak_data= 'object detected is'+ result[0].label;
   utterThis= new SpeechSynthesisUtterance(speak_data);
   synth.speak(utterThis);
   
document.getElementById('result_object_name').innerHTML=result[0].label;
document.getElementById('result_object_accuracy').innerHTML=result[0].confidence.toFixed(3);
 }

 }

}




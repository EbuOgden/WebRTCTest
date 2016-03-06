if (Meteor.isCordova || Meteor.isClient) {
	var record;
	var recordVideo;
	var recordAudio;
	var videoElem;
	var videoShow;
	var mediaInfo = {
		audio : true,
		video : true
	}
	
	var videoInfo = {
		video : true
	}
	
	var audioInfo = {
		audio : true
	}
	
	
	Template.hello.rendered = function(){
		videoElem = document.getElementById('cam');	
		videoShow = document.getElementById('show');
		videoElem.src="/answer.wav";
	
	}
	
	Template.hello.events({
		'click #start' : function(){
			navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia || 
                            navigator.msGetUserMedia);

			
			//navigator.getUserMedia(videoInfo, vidSuccess, onError);
			navigator.getUserMedia(mediaInfo, success, onError);
			//navigator.getUserMedia(audioInfo, audioSuccess, onError);
		},
		
		'click #stop' : function(){
			
		} 
	})
	
	
}	

var success = function(stream){
	console.log("mediaInfo");
	navigator.getUserMedia(videoInfo, vidSuccess, onError);
	videoElem.src = window.URL.createObjectURL(stream);
	record = RecordRTC(stream);
	record.startRecording();
			
	setTimeout(function(){
		record.stopRecording(function(audioVideoURL){
			console.log("audio + video URL : " + audioVideoURL);
			videoShow.src = audioVideoURL;
					
					
			/*var recordedBlob = recordRTC.getBlob();
				recordRTC.getDataURL(function(dataURL) { 
				console.log(dataURL);
			});	*/
	});
				
	}, 6000);

}

var vidSuccess = function(stream){
	console.log("videoInfo");
	navigator.getUserMedia(audioInfo, audioSuccess, onError);
	recordVideo = RecordRTC(stream);
	recordVideo.startRecording();
	
	setTimeout(function(){
		recordVideo.stopRecording(function(videoURL){
			console.log("video URL : " +videoURL);
			//videoShow.src = audioVideoWebMURL;
					
					
			/*var recordedBlob = recordRTC.getBlob();
				recordRTC.getDataURL(function(dataURL) { 
					console.log(dataURL);
				});	*/
		});
					
	}, 5500);
	
}

var audioSuccess = function(stream){
	console.log('audioInfo');
	recordAudio = RecordRTC(stream);
	recordAudio.startRecording();
	
	setTimeout(function(){
		recordAudio.stopRecording(function(audioURL){
			console.log("audio URL : " + audioURL);
		})
	}, 5000);
}

var onError = function(errror){
	console.log("error : " + errror);
}


$(function (){
	$(".moreComments").on('click', function() {				//Комментарии
		if ($(this).parents(".post").find(".comments").attr("style") == "display: none;") {
			$(this).text('Hide comments');
			$(this).parents(".post").find(".comments").slideDown();
		}
		else {
			$(this).text('Show comments');
			$(this).parents(".post").find(".comments").slideUp();;
		}
	});
	
	var audio = new Audio();
	audio.loop = true;
	let timePass;
	start(audio, timePass);
	like();
});

function start(audio, timePass){							//Воспроизведение
	$(".Play, .playCurrentTrack").on('click', function () {		
		if (($(this).attr('class') == "Play") || ($(this).attr('class') == "playCurrentTrack") ) {
			if ($(this).attr('class') == "Play"){
			$( ".Play" ).each(function() {
				$(".Play").show();
			});
			$( ".Pause" ).each(function() {
				$(".Pause").hide();
			});
			$(".track").each(function() {
				$(".track").attr('id', '');
			});
			}
			clearTimeout(timePass);
		
			$(this).parents(".track").attr('id', 'current');		
			var track = $("#current").find("audio").attr("src");
			audio.src = track;
			audio.play();
			$("#current").find(".Play").hide();
			$("#current").find(".Pause").show();
			var percent = 0;
			var durationMinutes = Number($("#current").find(".minutes").html());
			var durationSeconds = Number($("#current").find(".seconds").html());
			var duration = durationMinutes * 60 + durationSeconds;		
			var currentMinutes = Number($("#current").find(".minutesPass").html());
			var currentSeconds = Number($("#current").find(".secondsPass").html());
			audio.currentTime = currentMinutes * 60 + currentSeconds;
			
			var currentTrackIcon = $(this).parents(".track").find(".trackIcon").attr("src");
		
			$(".currentTrack").find(".trackIcon").attr("src", currentTrackIcon);
			$('.playCurrentTrack').hide();
			$('.pauseCurrentTrack').show();
			$(".minutesCurrentTrack").text(durationMinutes);
			$(".secondsCurrentTrack").text(durationSeconds);
			$(".currentTrackName").text($("#current").find(".trackName").text());
			$(".currentTrackAuthor").text($("#current").find(".author").text());
			$(".currentLikeCount").text($("#current").find(".likeCount").text());
			if($("#current").find(".unlike").attr('style') == "display: none;") {
				$(".currentLikeButton").show();
				$(".currentUnlike").hide();
			}
			if($("#current").find(".likeButton").attr('style') == "display: none;") {
				$(".currentLikeButton").hide();
				$(".currentUnlike").show();
			}
		
			timePass = setInterval(() => {
				currentMinutes = Math.floor(audio.currentTime / 60);
				currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
				$("#current").find(".secondsPass").text(currentSeconds);
				$("#current").find(".minutesPass").text(currentMinutes);
				$('.secondsPassCurrentTrack').text(currentSeconds);
				$('.minutesPassCurrentTrack').text(currentMinutes);
				if (audio.ended) {
					clearTimeout(timePass);				
					$("#current").find(".minutesPass").text(0);
					$("#current").find(".secondsPass").text(0);
					}
				percent = audio.currentTime / duration * 100;
				$("#current").find(".progressBarPassed").css('width',percent+'%');	
				$(".progressBarPassedCurrentTrack").css('width', percent+'%');
				}
				, 1000);
			stop(audio, timePass);	
			toMoment(audio, duration);			
		}
	});
}

function stop(tempAudio, timer){					//Пауза
	$(".Pause").on('click', function () {
		audio = tempAudio;
		audio.pause();
		$(this).hide();
		$(this).parent().find(".Play").show();
		$(".playCurrentTrack").show();
		$(".pauseCurrentTrack").hide();
		clearTimeout(timer);		
	});	
	$(".pauseCurrentTrack").on('click', function () {
		audio = tempAudio;
		audio.pause();
		$(this).hide();
		$(this).parent().find(".playCurrentTrack").show();
		$("#current").find(".Play").show();
		$("#current").find(".Pause").hide();
		clearTimeout(timer);		
	});	
};

function toMoment(audio, duration) {						//Перемотка
		$(".progressBar, .progressBarCurrentTrack").on('click', function(e) {
		if (!(audio.paused) && (($(this).parents(".track").attr('id') == "current") || ($(this).attr('class') == "progressBarCurrentTrack"))) {
			var left = $(this).offset().left;
			var Xinner = e.pageX - left;
			var posPercent = Xinner / $(this).width() * 100;
			var toSecond = duration / 100 * posPercent;
			audio.currentTime = toSecond;
			audio.play();
		}
	});
}

function like(){
		$(".likeButton").on('click', function(){
		$(this).hide('slow');
		$(this).parent().find(".unlike").show('slow');
		if ($(this).parents(".track").attr('id') == "current"){
			$(".currentLikeButton").hide('slow');
			$(".currentUnlike").show('slow');
		}
	});

	$(".unlike").on('click', function(){
		$(this).hide('slow');
		$(this).parent().find(".likeButton").show('slow');
		if ($(this).parents(".track").attr('id') == "current"){
			$(".currentLikeButton").show('slow');
			$(".currentUnlike").hide('slow');
		}
	});
	
	$(".currentLikeButton").on('click', function(){
		$(this).hide('slow');
		$(this).parent().find(".currentUnlike").show('slow');
		$("#current").find(".likeButton").hide('slow');
		$("#current").find(".unlike").show('slow');
	});
	
	$(".currentUnlike").on('click', function(){
		$(this).hide('slow');
		$(this).parent().find(".currentLikeButton").show('slow');
		$("#current").find(".likeButton").show('slow');
		$("#current").find(".unlike").hide('slow');
	});
}
  var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

var allowedKeys = {
  73: 'i',
  78: 'n',
  74: 'j',
  69: 'e',
  67: 'c',
  84: 't',
  83: 's',
  51: '3',
  67: 'c',
  82: 'r',
  69: 'e',
  84: 't',
  83: 's' 
};

var konamiCode = ['i', 'n', 'j', 'e', 'c', 't', 's', '3', 'c', 'r', 'e', 't', 's'];
var konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
	 setTimeout(function () {
	     	konamiCodePosition = 0;
	     	console.log('Konami Code has been reset: too long entering time ');
     	}, 5000);
     	
  var key = allowedKeys[e.keyCode];  
  var requiredKey = konamiCode[konamiCodePosition];
  
   if (e.keyCode == 20 || e.keyCode == 16 || e.keyCode == 27) {
       	konamiCodePosition = 0; 
       	console.log('Konami Code has been reset: please use lowercase ');
       }

  if (key == requiredKey) {
     konamiCodePosition++;
	    if (konamiCodePosition == konamiCode.length) {
	      activateIssues();
	      konamiCodePosition = 0;
	    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateIssues() {
   document.getElementById("issues").style.display = "block";
   getJSON('https://api.github.com/repos/elixir-lang/elixir/issues',
		function(err, data) {
			var li, issuesList;
			  if (err != null) {
			    console.log('Something went wrong: ' + err);
			  } else {
			  	 displayIssues(data)
			  }
		});
}

function displayIssues(newestIssues) {
	var li;
		 for (var i = 0; i < 5; i++) {			
			li = document.createElement('li');
			li.setAttribute('id', i);
			li.innerHTML = 'Title : ' + newestIssues[i].title + "<br>" + 'Author : '  + newestIssues[i].user.login;		
			document.getElementById('issues').appendChild(li);
		}
		hideIssues();				 
}

function hideIssues() {
	setTimeout(function () {
				document.getElementById("issues").style.display = "none";
				window.location.reload(true);
	},15000);
}

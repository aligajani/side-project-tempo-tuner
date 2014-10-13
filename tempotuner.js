$(document).ready(function () {  

    // The SoundCloud API Key 
    var client_id = '7182630dc6a6fc8aa606657648545826';
    
    // Launch the SoundCloud Application
    SC.initialize({
        client_id: client_id
    });

   
    // Low BPM
    $('#low').on("click", function () {
        
        // For User Experience
        $('.art').attr("src", "http://i.imgur.com/QszPWIq.gif");
        
        //specify low bpm genres
        var l = [ "ambient" , "classical", "soul", "folk",  "piano", "country", "reggae", ];
        
        //convert to list
        var low = l.join(",")
        
        //now go and play a random tune
        pickRandom(low, "Low");
                 
                 
    });
    
      // Medium BPM
    $('#medium').on("click", function () {
                
         // For User Experience
        $('.art').attr("src", "http://i.imgur.com/QszPWIq.gif");                 
       
        //specify medium bpm genres
        var m = [ "pop", "alternative rock", "jazz", "latin", "r&b", "world"  ];
        
        //convert to list
        var medium = m.join(",")
        
        //now go and play a random tune
        pickRandom(medium, "Medium");
    });
    
    
      // High BPM
    $('#high').on("click", function () {
        
         // For User Experience
        $('.art').attr("src", "http://i.imgur.com/QszPWIq.gif");
        
         //specify high bpm genres
        var h = [ "rock", "techno", "electronic", "trance", "dance", "house", "metal", "rap" ];
        
        //convert to list
        var high = h.join(",")
        
        //now go and play a random tune
        pickRandom(high, "High");
    });
    
 
    
    
    // Pick a random tune based on parameters
    function pickRandom(g, t) {
       
        SC.get('/tracks', { genres: g , limit: 200 }, function (tracks, error) { 
             //alert(tracks.length);
            
            for (var i=0; i<200; i++) {
                console.log((tracks[i]));
                
            }
            
            if ((tracks.length == 0)) {
                
                // Empty to prevent fuss
                $('.error').empty();
                
                // Throw error if object is 0
                $('.error').append('No tracks found. Please try again. ');
            } else {
                
                // Empty to prevent fuss
                $('.error').empty();
                
                // Get all tracks
                all_tracks = tracks;
                
                // Pick a random track from the array
                var track = all_tracks[Math.floor(Math.random() * all_tracks.length)];
                
                // Pipe to the player function
                playTune(track, t);
            
            }
                
        
            
            
        });
    
    }

    // Play a tune using the SC.oEmbed
    function playTune(track, t) {
     
        SC.oEmbed(track.permalink_url, 
        {
            auto_play: true
        }, 
        
        document.getElementById("track"));
        
        // When Sound Manager is ready give output
        SC.whenStreamingReady(function () { 
            
            $('.status').append("<span>Loaded </span>" + t + "<br></br>");
          
        
        });
                
        // Get Art Work URL
        var art = track.artwork_url;
        
        // Now get a bigger image
        
        
        if (art != null) {
            //if not null get a large version
            var art_500 = art.replace("large", "t500x500");
        } else {
            //if null then ust put a dummy image
            var art_500 = "http://images2.layoutsparks.com/1/67897/music-love-life-headphone.gif";
        }
        
        // Show it to the world
        $('.art').attr("src",art_500);
        
        // Get Title
        var title = track.title;
        
        // Get Duration
        var duration = Math.floor(((track.duration)/1000)/60) + " minutes";
        
        // Empty to prevent fuss
        $('.now_playing').empty();
        
        // Show the details
        $('.now_playing').append("<h2>" + title + "</h2>");        

      
    }
    
  
  });

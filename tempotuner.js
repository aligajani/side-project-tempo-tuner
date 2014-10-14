/*

tempotuner.js | Free to use but please give credits

The MIT License (MIT)

Copyright (c) 2014 Ali Gajani (http://www.aligajani.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

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
       
        //pick 200 at a time with specific genres parameters
        SC.get('/tracks', { genres: g , limit: 200 }, function (tracks, error) { 
            
            //if track array is empty
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


        // This works on Desktops only
        // SC.oEmbed(track.permalink_url, 
        // {
        //     auto_play: true
        // }, 
        
        // //load it up in the specific div and hide it
        // document.getElementById("track"));

        // This works on iPhones and Desktops
        var mp3 = "https://api.soundcloud.com/tracks/" + track.id + "/stream?client_id=" + client_id;

        // Add source to audio tag
        $('#track').attr("src", mp3);

        // Get the track tag where audio resides
        var thissound=document.getElementById("track");
        
        // Now play it
        thissound.play();
        
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
            //if null then use put a dummy image
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

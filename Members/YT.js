window.onload = function() {
    oauthSignIn();


  var btn = document.getElementById("tst");
  btn.addEventListener("click", function(e) {
    
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        document.getElementById("res").innerHTML = this.responseText;
      }
      xhttp.open("GET", "https://www.googleapis.com/auth/youtube.channel-memberships.creator");
      xhttp.send();

  })



}









/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '677416655777-i1v9snk7kc4erhrdhdlfgdv2tgo4un2a.apps.googleusercontent.com',
                  'redirect_uri': 'https://www.cats4nelson.com/Members',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
                  'include_granted_scopes': 'true',
                  'state': 'YouTube.html'};
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  
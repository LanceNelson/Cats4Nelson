window.onload = function() {
    document.getElementById("merch").addEventListener("click", 
    function() {
        window.open("https://www.amazon.com/shop/louisenelson");
        //window.open("https://cats4nelson.myspreadshop.com");
    })
    
    var x = 1
    if(document.location.href.indexOf("?p=") > 0) {
        document.getElementById("mainPage").remove();
        document.getElementById("btnMore").remove();
        x = document.location.href.split('=')[1];
    }
        fetch('https://catsapiondemand.azure-api.net/Post/' + x)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                document.getElementById("content").innerHTML = "<h2>" + myJson.title + "</h2><img src='https://nelsoncats.blob.core.windows.net/images/Thumbs/" + myJson.image + "'/><br/><h3>" + myJson.timestamp + 
                "</h3><p>" + myJson.description + "</p><p>&nbsp;</p><p><button id='retBtn' class='btn' type='button'>Return</button></p>";
                document.getElementById("retBtn").addEventListener("click", function() {
                    window.location.href = "https://www.cats4nelson.com/index.html";
                });
                document.getElementById("loading").style.display = "none";
            });


    
}
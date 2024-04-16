window.onload = function() {
    document.getElementById("merch").addEventListener("click", 
    function() {
        window.open("https://www.amazon.com/shop/louisenelson");
        //window.open("https://cats4nelson.myspreadshop.com");
    })
console.log(document.location.href);
    if(document.location.href.indexOf("/?") > 1)
        window.location = "https://www.cats4nelson.com/index.html";

    if (document.location.href.indexOf("index.h") > 2 ||
        document.location.href.length < 35 ||
        document.location.href == "http://localhost/cats4nelson/") {  
        fetch('https://catsapiondemand.azure-api.net/Posts', {mode: "cors"})
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                var content = document.getElementById("content");
                content.innerHTML = "";
                for(const p of myJson){
                    const t = document.createElement("h3");
                    t.append(p.timestamp);
                    const d = document.createElement("div");
                    d.append(t);
                    const l = document.createElement("a");
                    if(p.url == null) {
                        d.append(p.title);
                        d.append(document.createElement("br"));
                        l.setAttribute("href","/Pics.html?p=" + p.id);
                    }
                    else {
                        l.setAttribute("href", p.url)
                        l.setAttribute("target","_blank");
                    }
                    const i = document.createElement("img");
                    i.setAttribute("src", "https://nelsoncats.blob.core.windows.net/images/Thumbs/" + p.image);
                    l.append(i);
                    d.append(l);

                    content.append(d);
                }
                document.getElementById("loading").style.display = "none";
            });
        document.getElementById("btnMore").addEventListener("click", function() {
            document.getElementById("loading").style.display = "block";
            var pg = parseInt(document.getElementById("currPg").value) + 1;
            fetch('https://catsapiondemand.azure-api.net/Posts?p=' + pg)
                .then(function(response){
                    console.log(response);
                    if(response.status == 404){
                        d.innerHTML ="No more items";
                        document.getElementById("moreContent").append(d);
                        document.getElementById("loading").style.display = "none";      
                    }

                    return response.json();
                })
                .then(function(myJson) {
                    var content = document.getElementById("moreContent");
                    content.innerHTML = "";
                    for(const p of myJson){
                        const t = document.createElement("h3");
                        t.append(p.timestamp);
                        const d = document.createElement("div");
                        d.append(t);
                        const l = document.createElement("a");
                        if(p.url == null) {
                            d.append(p.title);
                            d.append(document.createElement("br"));
                            l.setAttribute("href","/Pics.html?p=" + p.id);
                        }
                        else {
                            l.setAttribute("href", p.url)
                            l.setAttribute("target","_blank");
                        }
                        const i = document.createElement("img");
                        i.setAttribute("src", "https://nelsoncats.blob.core.windows.net/images/Thumbs/" + p.image);
                        l.append(i);
                        d.append(l);
    
                        content.append(d);
                    }
                    if(content.innerHTML == "")
                        content.append("<p>No more items</p>");
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("currPg").value = pg;
                })
                .catch(error => {
                    const d = document.createElement("p");
                    d.innerHTML ="No more items";
                    document.getElementById("moreContent").append(d);
                    document.getElementById("loading").style.display = "none";                    
                })
        });
    }
    if(document.location.href.indexOf("?p=") > 0) {
        document.getElementById("mainPage").remove();
        document.getElementById("btnMore").remove();
        var x = document.location.href.split('=')[1];
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
}
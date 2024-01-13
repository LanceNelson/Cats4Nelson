window.onload = function() {
    document.getElementById("merch").addEventListener("click", 
    function() {
        window.open("https://www.amazon.com/shop/louisenelson");
        //window.open("https://cats4nelson.myspreadshop.com");
    })
console.log(document.location.href);

    if(document.location.href == "https://www.cats4nelson.com" ||
        document.location.href.indexOf("index.h") > 2 ||
        document.location.href == "http://localhost/cats4nelson/") {
        fetch('https://cats4api.azure-api.net/Posts', {mode: "cors"})
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
                        l.setAttribute("href","?p=" + p.id);
                    }
                    else {
                        l.setAttribute("href", p.url)
                        l.setAttribute("target","_blank");
                    }
                    const i = document.createElement("img");
                    i.setAttribute("src", "images/Thumbnails/" + p.image);
                    l.append(i);
                    d.append(l);

                    content.append(d);
                }
                document.getElementById("loading").style.display = "none";
            });
        document.getElementById("btnMore").addEventListener("click", function() {
            document.getElementById("loading").style.display = "block";
            fetch('https://cats4api.azure-api.net/Posts?p=')
                .then(function(response){
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
                            l.setAttribute("href","?p=" + p.id);
                        }
                        else {
                            l.setAttribute("href", p.url)
                            l.setAttribute("target","_blank");
                        }
                        const i = document.createElement("img");
                        i.setAttribute("src", "images/Thumbnails/" + p.image);
                        l.append(i);
                        d.append(l);
    
                        content.append(d);
                    }
                    document.getElementById("loading").style.display = "none";
                })
        });
    }
    if(document.location.href.indexOf("?p=") > 0) {
        document.getElementById("mainPage").remove();
        document.getElementById("btnMore").remove();
        var x = document.location.href.split('=')[1];
        fetch('https://cats4api.azure-api.net/Post/' + x)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                document.getElementById("content").innerHTML = "<h2>" + myJson.title + "</h2><img src='images/Thumbnails/" + myJson.image + "'/><br/><h3>" + myJson.timestamp + 
                "</h3><p>" + myJson.description + "</p><p>&nbsp;</p><p><button id='retBtn' class='btn' type='button'>Return</button></p>";
                document.getElementById("retBtn").addEventListener("click", function() {
                    window.location.href = "https://www.cats4nelson.com";
                });
                document.getElementById("loading").style.display = "none";
            });


    }
}
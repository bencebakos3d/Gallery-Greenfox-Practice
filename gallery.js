fetch("gallerydata.json").then(response => response.json()).then(function(response) {
    let jsonData = response;
    let largeImage = document.getElementById("gallery-image");
    let thumbnailWrapper = document.getElementById("gallery-thumbnails");
    let leftButton = document.getElementById("left-button");
    let rightButton = document.getElementById("right-button");
    let index = 0;

    // Creates the thumbnails 
    function addImage(path, title, text) {
        let newImage = document.createElement("div");
        newImage.className = "gallery-thumbnail-el";
        newImage.style.backgroundImage = "url(gallery_images/" + path + ")";
        thumbnailWrapper.appendChild(newImage);
    }

    for (key in jsonData.gallery) {
        addImage(jsonData.gallery[key].filename);
    }
    
    function changeImage(param) { 
        document.getElementById("image-title").innerHTML = jsonData.gallery[param].title;
        document.getElementById("image-text").innerHTML = jsonData.gallery[param].description;
        largeImage.setAttribute("src", "gallery_images/" + jsonData.gallery[param].filename);
    }
    changeImage(0)

    // Button functionality 
    leftButton.addEventListener('click', function()  {
        if (index === 0) {
            index = jsonData.gallery.length - 1; 
        } else {
            index--
        }
        changeImage(index);
    })

    rightButton.addEventListener('click', function()  {
        if (index === jsonData.gallery.length - 1) {
            index = 0; 
        } else {
            index++
        }
        changeImage(index);
    })

    // Adds functionality to thumbnails
    let thumbnailList = document.querySelectorAll("#gallery-thumbnails > div");                       
    for (let i = 0; i < thumbnailList.length; i++) {
        thumbnailList[i].addEventListener('click', function() {
            index = i
            changeImage(index)
        })
    }
});
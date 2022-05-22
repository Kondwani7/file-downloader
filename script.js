const fileOutput = document.querySelector("input")
let downloadBtn = document.querySelector("button")


downloadBtn.addEventListener("click", e => {
    //prevent the form from submitting
    e.preventDefault();
    //indicate the file is being downloaded
    downloadBtn.innerHTML = "Downloading file...";
    //get the url for parsing to the target for downloading
    fetchFile(fileOutput.value)
})

function fetchFile(url) {
    //fetch the pasted url and return the response as a blob
    fetch(url).then(res => res.blob()).then(file => {
        //create a url from the passed  object
        let tempUrl = URL.createObjectURL(file);
        //a create a link with the a tag
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        //passing the file name & extension as a dynamic download value of the <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        //adding the <a> tag inside the landing page's body
        document.body.appendChild(aTag);
        //click the tag to download by clicking the download button
        aTag.click()
        //remove the <a> tag once we've download our file
        aTag.remove()
        //removing our tempUrl from our DOM
        URL.revokeObjectURL(tempUrl)
        //download the file message
        downloadBtn.innerText = "Download File";
    }).catch(() => {
        //catch any download errors
        downloadBtn.innerText = "Download File"
        alert("File failed to download")
        //note that youtube videos fail to download because of the CORS policy: No 'Access-Control-Allow-Origin' 
    });
}
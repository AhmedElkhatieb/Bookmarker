var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var subBtn = document.getElementById("sub-btn");
subBtn.onclick = addSite;

var sitesList;
if (localStorage.getItem("site") !== null) {
  sitesList = JSON.parse(localStorage.getItem("site"));
  display();
} else {
  sitesList = [];
}

function addSite() {
    var site = {
      sName: siteName.value,
      sUrl: siteUrl.value,
    };
    if (isValidURL(site.sUrl)){
      if ((site.sUrl.startsWith("https://"))){
        site.sUrl = site.sUrl.slice(8);
      }
      else if ((site.sUrl.startsWith("http://"))){
        site.sUrl = site.sUrl.slice(7);
      }
      sitesList.push(site);
      localStorage.setItem("site", JSON.stringify(sitesList));
      display();
      resetForm();
    }
    else{
      alert("URL is not valid!");
    }
  }

function display() {
  var box = ``;
  for (var i = 0; i < sitesList.length; i++) {
    box += `
        <tr>
            <td class="bg-light">${i + 1}</td>
            <td class="bg-light">${sitesList[i].sName}</td>
            <td class="bg-light"><a href="https://${sitesList[i].sUrl}" target="_blank"><button class="visit-btn rounded py-2 px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
            <td class="bg-light"><button onclick="deleteSite(${i})" class="delete-btn rounded py-2 px-3"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = box;
}

function resetForm() {
  siteName.value = null;
  siteUrl.value = null;
}

function deleteSite(index) {
  sitesList.splice(index, 1);
  display();
  localStorage.setItem("site", JSON.stringify(sitesList));
}

function isValidURL(url) {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return regex.test(url);
}

var languages = Array.from(document.getElementsByClassName('language'));
var xhttp = new XMLHttpRequest();
var langDocument = {};
languages.forEach(function(value, index){
    languages[index].addEventListener('click', function(){
        switchLanguage(this.dataset.lang);
    });
    switchLanguage('britain');
});
xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200) {
        langDocument = JSON.parse(this.responseText);
        processLangDocument();
        processCurrencyDocument();
        processDateTimes();
    }
};
function switchLanguage(language){
    xhttp.open("GET", "languages/" + language + ".json", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}
function processLangDocument(){
    var tags = document.querySelectorAll('span,img,a,label,li,option,h1,h2,h3,h4,h5,h6,p,div,button');
    Array.from(tags).forEach(function(value, index){
        var key = value.dataset.langkey;
        if(langDocument[key]) value.innerText = langDocument[key];
    });
}
function processCurrencyDocument() {
    var tags = document.querySelectorAll('input');
    Array.from(tags).forEach(function(value, index) {
        var key = value.dataset.currency;
        value.value = "";
        if(!key) return;        
        value.addEventListener("change", function(evt) {
            var val =  evt.target.value;
            val =  Number(val.replace(/[^0-9.-]+/g,""));
            evt.target.value = (val).toLocaleString(langDocument['LocaleFormat'], { style: 'currency', currency: langDocument['Currency']});
        });
    });
}

const buttons = document.querySelectorAll('.language');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(button => button.classList.remove('active'));
    button.classList.add('active');
    });
});

function changePlaceholder() {
    var el = document.getElementById("en");
    if((' ' + el.className + ' ').indexOf(' ' + 'active' + ' ') > -1){
        document.getElementById("Name").placeholder = "????'?? *";
        document.getElementById("Email").placeholder = "?????????? *";
        document.getElementById("Subject").placeholder = "????????";
        document.getElementById("Message").placeholder = "????????????????????????";

        document.getElementById("gif").style.left = "25%"
        var newHTML = '<p id="gif-text" class="gif-text">' +
        '?????? ???????????? ??????-?????? ?????????????? ?????????? ??????????????????.<br/>' +
        '????????????????????: <a href="https://www.sightextended.com">www.sightextended.com</a>' +
        '</p>'
        $('p.gif-text').replaceWith(newHTML);
    }
    else{
        document.getElementById("Name").placeholder = "Name *";
        document.getElementById("Email").placeholder = "Email *";
        document.getElementById("Subject").placeholder = "Subject";
        document.getElementById("Message").placeholder = "Message";

        document.getElementById("gif").style.left = "30%"

        var newHTML = '<p id="gif-text" class="gif-text">' +
        'Sight is about to receive a full length adaptation.<br/>' +
        'For more details: <a href="https://www.sightextended.com">www.sightextended.com</a>' +
        '</p>'
        $('p.gif-text').replaceWith(newHTML);
    }
  }
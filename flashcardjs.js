var card_no = 1;
var lastRandom;
var str = "organic molecules which combine to form living organisms includes carbohydrates, lipids, proteins and nucleic acids#macromolecules;biomolecule composed of carbon, hydrogen and oxygen (includes fats, oils, waxes and sterols) important component of cell membranes#lipids;biomolecule made up of nucleotides examples include DNA and RNA#nucleic acids;an organism whose cell generally lacks a true nucleus e.g. bacterial cells#prokaryotic;organism possessing a membrane bound nucleus#eukaryotic;A long continuous thread of DNA that consists of numerous genes along with regulatory information#chromosome";
var card_array;
var arrayLength;
var google = true;
var selected_theme = "blue";
var themes = {
  blue:{frbg:'#1189d1',babg:'#052c44',brbc:'#86cbf5'},
  green:{frbg:'#18b755',babg:'#063016',brbc:'#7aeea'},
  yellow:{frbg:'#f3b50b',babg:'#614804',brbc:'#fbe19c'},
  orange:{frbg:'#ef4809',babg:'#5c1c03',brbc:'#fbb296'},
  red:{frbg:'#e82c0c',babg:'#571004',brbc:'#f9a294'}
};
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1nmmf-46WO7Mi-_EOb5rIRGZyfMA9VB4BZYfMFttOjBM/edit?usp=sharing';

$(".front").css('background-color', themes[selected_theme].frbg);
$(".back").css('background-color', themes[selected_theme].babg);
$(".back").css('border-color', themes[selected_theme].brbc);
$(".btn-primary").css('background-color', themes[selected_theme].frbg);

if (google) {
  Tabletop.init( { key: publicSpreadsheetUrl,
                  callback: loadSheet,
                  simpleSheet: true } )
} else {
  initCards(str);
}


$(".flippable").click(function(){
  $(this).toggleClass("flipme");
});
$("[data-name='random']").click(function() {
  LoadCard("random");
});
$("[data-name='next']").click(function() {
  card_no = card_no + 1;
  if (card_no > arrayLength) {
    card_no = arrayLength;
  }
  LoadCard("next");
});
$("[data-name='prev']").click(function() {
  card_no = card_no - 1;
  if (card_no < 1) {
    card_no = 1;
  }
  LoadCard("next");
});


function LoadCard(cmd) {
  if (cmd === "first") {
    var card = card_array[0].split("#");
    $(".front").html("<p>"+card[0]+"</p>");
    $(".back").html("<p>"+card[1]+"</p>");
    $("[data-name='random']").html("1 / "+arrayLength);
  }
  if (cmd === "next") {
    var card = card_array[(card_no-1)].split("#");
    $(".front").html("<p>"+card[0]+"</p>");
    $(".back").html("<p>"+card[1]+"</p>");
    $("[data-name='random']").html(card_no+" / "+arrayLength);
  }
  if (cmd === "random") {
    var random_card = getRandomInt(0, (arrayLength-1));
    var card = card_array[random_card].split("#");
    $(".front").html("<p>"+card[0]+"</p>");
    $(".back").html("<p>"+card[1]+"</p>");
    $("[data-name='random']").html((random_card+1)+" / "+arrayLength);
    card_no = random_card + 1;
  }
lastRandom = card_no - 1;
}

function getRandomInt(min, max) {
var random = Math.floor(Math.random() * (max - min + 1)) + min;
  if (lastRandom !== undefined) {
    if (random == lastRandom) {
      random = random + 1;
    }
    if (random > max) {
      random = random - 2;
    }
  }
  lastRandom = random;
  return random;
}

function loadSheet(data, tabletop) {
  var mystr = "";
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var thisRow = "";
        for (var key2 in data[key]) {
          if (data[key].hasOwnProperty(key2)) {
            thisRow = thisRow + data[key][key2] + "#";
          }
        }
      thisRow = thisRow.slice(0, -1);
      mystr = mystr + thisRow + ";";
    }
  }
  initCards(mystr);
}

function initCards(card_config) {
  card_array = card_config.split(";");
  arrayLength = card_array.length; 
  LoadCard("first");
}
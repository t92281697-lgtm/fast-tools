const search = document.getElementById("search");

if(search){

search.addEventListener("input",()=>{

const keyword = search.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const text = card.innerText.toLowerCase();

card.style.display =
text.includes(keyword)
? "block"
: "none";

});

});

}
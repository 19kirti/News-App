const apiKey = "ead939c27d884beb8d2c3337777775a0";

const searchBar = document.getElementById("search");
const searchButton = document.getElementById("btn");

searchButton.addEventListener("click", async ()=>{
    const searchQuery = searchBar.value.trim();

    if(searchQuery !== ""){
        try{
            const articles = await fetchNewsQuery(searchQuery);
            displayBlocks(articles);
        }
        catch(error){
            console.error("Error in fetching news from query", error);
        }
}

});

async function fetchNewsQuery(searchQuery){

    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
        
    }
    
    catch(error){
        console.error("Error in fetching news", error);
        return [];
    }
    
    }

async function fetchNews(){

try{
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
    
}

catch(error){
    console.error("Error in fetching news", error);
    return [];
}

}

const card_container = document.getElementById("card-cont");
//const block = document.querySelectorAll(".blocks");


function displayBlocks(articles){
    card_container.innerHTML = "";

    articles.forEach((article) => {
        const card = document.createElement("div");
        card.classList.add("blocks");

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://starryoptics.com/wp-content/uploads/2022/05/NEWS.jpg";
        img.alt = article.title;
        const heading = document.createElement("h2");
        const shortHead = article.title > 30 ? article.title.slice(0,30)+ "..." : article.title;
        heading.textContent = shortHead; 
        
        const description = document.createElement("p");
        const shortDes = article.title > 100 ? article.title.slice(0, 100) + "..." : article.title;
        description.textContent = shortDes;

        card.appendChild(img);
        card.appendChild(heading);
        card.appendChild(description);
        card.addEventListener("click", ()=>{
            window.open(article.url, "_blank");
        })
        card_container.appendChild(card);
    }
);

}

(async () => {
    try{
        const articles = await fetchNews();
        displayBlocks(articles);
    }
    catch(error){
        console.error("Error in running a function", error);
    }
})();

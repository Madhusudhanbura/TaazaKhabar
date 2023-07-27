const API_KEY = "23f97e42fe7b4b24a4995abd0b90eecf"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', () => fetchNews("India"));


async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone,article);

        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerText = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

let currSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);

    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchBtn  = document.getElementById('search-btn');
const searchText  = document.getElementById('news-input');

searchBtn.addEventListener("click", () => {
    const query = searchText.value;
    
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
})

function reload(){
    window.location.reload();
}
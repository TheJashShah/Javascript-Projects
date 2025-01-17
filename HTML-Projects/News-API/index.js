const URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey={YOUR_API_KEY}"
const mainDiv = document.getElementById("main")
let data;
let newsList;

const getNews = async () => {

    let response = await fetch(URL)
    return response.json()    
}

async function BtnClicked(){

    try{
        data = await getNews()
        newsList = data.articles;

        for(let article of newsList){
            const title = article.title;
            const content = article.content;
            const description = article.description;
            const author = article.author;
            const date = article.publishedAt;
            const link = article.url;
            const img = article.urlToImage;

            const articleDiv = document.createElement("div")

            const Title = document.createElement("h2")
            Title.textContent = title;

            const summary = document.createElement("p")
            summary.textContent = description;

            const authorLabel = document.createElement("h4")
            authorLabel.textContent = `Published by ${author} on ${date}`

            const LinkText = document.createElement("a")
            LinkText.innerHTML = "Link to Article"
            LinkText.href = link;

            const Img = document.createElement("img")
            Img.src = img;

            const Content = document.createElement("p")
            Content.textContent = ""

            const btn = document.createElement("button")
            btn.textContent = "More"

            btn.addEventListener("click", () => {
                Content.textContent = content;
            })

            articleDiv.appendChild(Title);
            articleDiv.appendChild(Img);
            articleDiv.appendChild(summary);
            articleDiv.appendChild(btn);
            articleDiv.appendChild(Content);
            articleDiv.appendChild(LinkText);
            articleDiv.appendChild(authorLabel);
            articleDiv.appendChild(document.createElement("hr"))

            mainDiv.appendChild(articleDiv)
        }
    }
    catch (e) {
        console.log(e)
    }
}

/*
author, content, description, title, publishedAt, url, urlToImage
*/

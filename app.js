//? script for youtube search
//google console: api key=AIzaSyA-ti4eSqM7QSF4SDKcE9QkkpA4b-PiN8Y
//@ endpoint https://www.googleapis.com/youtube/v3/search

const form = document.querySelector("#form");
const API_key = "AIzaSyA-ti4eSqM7QSF4SDKcE9QkkpA4b-PiN8Y";
const wrap = document.querySelector(".wrap");
const searchResult = document.querySelector(".search-result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchText = form.elements.query.value;
    console.log("searchtext", searchText);
    const items = await searchVideos(API_key, searchText, 10);
    console.log('items: ', items);
    renderVideoCard(items);
});

const searchVideos = async (key, search, maxResults) => {
    return await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&key=${key}&q=${search}`
    ).then((res) => res.data.items);
};

function renderVideoCard(items) {
    items.forEach((item) => {
        const wrapping = document.createElement("div");
        wrapping.classList.add('wrap');
        wrapping.innerHTML = `<div class="search-vid col-6">
        <iframe width="350" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="vid-detail col-6">
        <div class="text-wrap">
        <div class="title-info d-flex justify-content-between">
        <span class="title">${item.snippet.title}</span>
        <button class="dots-3">
        <i class="fas fa-ellipsis-v"></i></button>
        </div>
        <div class="video-history"><span class="views">1M views</span><i class="fas fa-dot icon-dot"></i><span class="posted-date">${item.snippet.publishTime}</span></div>
        <div class="channel-info"><img src="" alt="" class="channel-img"><a href="" class="channel-link">${item.snippet.channelTitle}</a><span class="confirmed-ch"><i class="fas fa-check-circle"></i></span></div>
        <div class="description">${item.snippet.description}</div>
        </div>`
        console.log('rendered: ', item.snippet.publishTime);
        formatDistance(
            new Date(`${item.snippet.publishTime}`),
            new Date(),
            { addSuffix: true }
        )
        searchResult.prepend(wrapping);
    });
}

//@description date posted
// formatDistance(
//     new Date('date'),
//     new Date(),
//     { addSuffix: true }
// )
/*
 `<div class="search-vid col-6">
 <iframe width="350" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 </div>
 <div class="vid-detail col-6">
    <div class="text-wrap">
    <div class="title-info d-flex justify-content-between">
    <span class="title">${item.snippet.thumbnails.title}</span>
    <button class="dots-3">
    <i class="fas fa-ellipsis-v"></i></button>
    </div>
    <div class="video-history"><span class="views">1M views</span><i class="fas fa-dot icon-dot"></i><span class="posted-date">${item.snippet.publishTime}</span></div>
    <div class="channel-info"><img src="" alt="" class="channel-img"><a href="" class="channel-link">${item.snippet.channelTitle}</a><span class="confirmed-ch"><i class="fas fa-check-circle"></i></span></div>
    <div class="description"><p>${item.snippet.description}</p></div>
    <div><span class="CC"><i class="far fa-closed-captioning"></i></span></div>
    </div>`
*/
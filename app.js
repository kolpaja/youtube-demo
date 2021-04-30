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
    renderVideoCard(items);
});

const searchVideos = async (key, search, maxResults) => {
    return await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&key=${key}&q=${search}`
    ).then((res) => res.data.items);
};
function renderVideoCard(items) {
    items.forEach((item) => {
        const video = document.createElement("div");
        video.innerHTML = `<iframe width="350" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        searchResult.prepend(video);
    });
}


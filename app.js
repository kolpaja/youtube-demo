//? script for youtube search
//google console: api key=AIzaSyA-ti4eSqM7QSF4SDKcE9QkkpA4b-PiN8Y
//@ endpoint https://www.googleapis.com/youtube/v3/search
const form = document.querySelector('#form');
const API_key = "AIzaSyA-ti4eSqM7QSF4SDKcE9QkkpA4b-PiN8Y";
const wrap = document.querySelector(".wrap");
const searchResult = document.querySelector(".search-result");

//@description result style
const video = document.querySelector('.search-vid')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchText = form.elements.query.value;
    console.log('searchtext', searchText);
    searchVideos(API_key, searchText, 10);
})

const searchVideos = async (key, search, maxResVideos) => {
    const config = { params: { key: key, q: search, maxResults: maxResVideos } }
    let res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&`, config);
    console.log('res:', res.data.items);
    res.data.items.forEach(item => {
        video.innerHTML = `<iframe width="350" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        // wrap.prepend(video);
        searchResult.appendChild(video);
    });
}


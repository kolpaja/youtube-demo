//? script for youtube search
//google console: api key=AIzaSyA-ti4eSqM7QSF4SDKcE9QkkpA4b-PiN8Y
//@ endpoint https://www.googleapis.com/youtube/v3/search
const form = document.querySelector("#form");
const API_key = "AIzaSyA-ti4eSqM7QSF4SDKcE9QkkpA4b-PiN8Y";
const wrap = document.querySelector(".wrap");
const searchResult = document.querySelector(".search-result");

//@description result style

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = form.elements.query.value;
  console.log("searchtext", searchText);
  searchVideos(API_key, searchText, 10);
});

const searchVideos = async (key, search, maxResults) => {
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&key=${key}&q=${search}`
  );
  console.log("res:", res.data.items);
  res.data.items.forEach((item) => {
    const video = document.createElement("div");
    video.innerHTML = `<iframe width="350" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    searchResult.prepend(video);
  });
};

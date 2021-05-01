//google console: api key=AIzaSyA-ti4eSqM7QSF4SDKcE9QkkpA4b-PiN8Y
//google console: api key=AIzaSyDYe3qU2XsK0yIKKyvk58n588upX8w1zBY second acc: kolpaja28

const form = document.querySelector("#form");
const API_key = "AIzaSyDYe3qU2XsK0yIKKyvk58n588upX8w1zBY";
const wrap = document.querySelector(".wrap");
const searchResult = document.querySelector(".search-result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchText = form.elements.query.value;
  const items = await searchVideos(API_key, searchText, 1);

  renderVideoCard(items.reverse());
});

const searchVideos = async (key, search, maxResults) => {
  return await axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&key=${key}&q=${search}`
    )
    .then((res) => res.data.items);
};
const searchVideosViewCount = async (key, videoId) => {
  console.log("searchVideosViewCount: ", videoId);
  return await axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${key}`
    )
    .then((res) => res.data.items.statistics);
};

//@description of view count fnx

//@Posted On Time ${PostedTime(minutes, days, months)}

function PostedTime(minutes, days, months) {
  if (months >= 12) {
    return `${Math.floor(months / 12)} year${months < 24 ? "" : "s"} ago`;
  } else {
    if (months < 12 && months > 0) {
      return `${months} month${months == 1 ? "" : "s"} ago`;
    } else {
      if (days >= 7 && days <= 31) {
        return `${Math.floor(days / 7)} week${days <= 13 ? "" : "s"} ago`;
      } else {
        if (days < 7 && days > 0) {
          return `${days} day${days == 1 ? "" : "s"} ago`;
        } else if (minutes >= 60) {
          return `${Math.floor(minutes / 60)} hour${
            minutes == 60 ? "" : "s"
          } ago`;
        } else {
          return `${minutes} minute ${minutes < 2 ? "" : "s"} ago`;
        }
      }
    }
  }
}
function renderVideoCard(items) {
  searchResult.innerHTML = "";
  items.forEach((item) => {
    const wrapping = document.createElement("div");
    wrapping.classList.add("wrap");
    const minutes = parseInt(
      moment().diff(
        moment(`${item.snippet.publishTime}`).format("YYYY-MM-DD"),
        "minute"
      )
    );
    const days = parseInt(
      moment().diff(
        moment(`${item.snippet.publishTime}`).format("YYYY-MM-DD"),
        "day"
      )
    );
    const months = parseInt(
      moment().diff(
        moment(`${item.snippet.publishTime}`).format("YYYY-MM-DD"),
        "month"
      )
    );

    let videoId = item.id.videoId;
    console.log(`videoId:  ${videoId}`);
    //@prepending the video search result
    wrapping.innerHTML = `<div class="search-vid col-6">
        <iframe width="350" height="200" src="https://www.youtube.com/embed/${
          item.id.videoId
        }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="vid-detail col-6">
        <div class="text-wrap">
        <div class="title-info d-flex justify-content-between">
        <span class="title">${item.snippet.title}</span>
        <button class="dots-3">
        <i class="fas fa-ellipsis-v"></i></button>
        </div>
        <div class="video-history"><span class="views">1M views</span><i class="fas fa-dot icon-dot"></i><span class="posted-date"></span>${PostedTime(
          minutes,
          days,
          months
        )}</div>
        <div class="channel-info"><img src="" alt="" class="channel-img"><a href="" class="channel-link">${
          item.snippet.channelTitle
        }</a><span class="confirmed-ch"><i class="fas fa-check-circle"></i></span></div>
        <div class="description">${item.snippet.description}</div>
        </div>`;

    searchResult.prepend(wrapping);
  });
}

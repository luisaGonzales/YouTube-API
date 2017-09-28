"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class App {
      constructor() {
            this.videos = [],
                  this.selectedVideo = null,
                  this.searchTerm = "iPhone X"
      }
      init() {
            //app.videoSearch("iPhone");
            this.youtubeSearch(this.searchTerm);
      }
      //<iframe className="embed-responsive-item" src={url}> </iframe>
      getVideoList(videos) {
            return videos.map((video, index) => {
                  const imageUrl = video.snippet.thumbnails.default.url;
                  const url = `https://www.youtube.com/embed/${video.id.videoId}`;
                  return `<li> 
                              <img class="media-object" src=${imageUrl} /> 
                              <p> 
                                 <iframe class="embed-responsive-item" src=${url}> </iframe>
                              </p>
                        </li>`;
            });
      }
      youtubeSearch(searchTerm) {
            console.log(searchTerm);
            YTSearch({
                        key: API_KEY,
                        term: searchTerm
                  },
                  data => {
                        this.videos = data;
                        this.selectedVideo = data[0];
                        this.searchTerm = searchTerm;
                        let list = this.getVideoList(this.videos);
                        console.log("lis: ", list);
                        $("#root").append(list);
                  });
      }
      videoSearch(searchTerm) {
            jQuery.getJSON("list.json", data => {
                  console.log("result", data.items);
                  this.videos = data.items;
                  this.selectedVideo = data.items[0];
                  this.searchTerm = searchTerm;
                  let list = this.getVideoList(this.videos);
                  console.log("lis: ", list);
                  $("#root").append(list);
            });
      }
}

let app = new App();
$(document).ready(this.init());
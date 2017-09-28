"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class App {
      constructor() {
            this.videos = [];
            this.selectedVideo = null;
            this.imagenes = undefined;
            this.searchTerm = "Fito & Fitipaldis - Entre la espada y la pared";
            this.inputBuscar = $("#inputBuscar");
            this.btnBuscar = $("#btnBuscar");
            this.reproducir = $("#playVideo");
            this.informacion = $("#informacion");
            this.lista = $("#root");
      }
      init() {
            this.youtubeSearch(this.searchTerm);
            this.inputBuscar.keyup((e) => {
                  if (e.which == 13) {
                        this.btnBuscar.click();
                  }
            });
            this.btnBuscar.click((e) => {
                  e.preventDefault();
                  this.lista.empty();
                  this.youtubeSearch(this.inputBuscar.val());
            });
      }
      getVideoList(videos) {
            return videos.map((video, index) => {
                  const imageUrl = video.snippet.thumbnails.default.url;
                  
                  return `<li> 
                              <img class="media-object" src=${imageUrl} id="${video.id.videoId}"/> 
                              <p> 
                                 <label>${video.snippet.title}</label>
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
                        this.lista.append(list);
                        let videoSeleccionado = this.videoSeleccionado(this.selectedVideo);
                        this.imagenes = $("img");
                        this.imagenes.click((e) => {
                            this.lista.empty()
                            this.youtubeSearch(e.target.id);
                            console.log(e.target.id);
                        });
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
      videoSeleccionado(video){
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            this.informacion.html(
                  `<h2>${video.snippet.title}</h2>
                  <h3>${video.snippet.description}</h3>`
            );
            return `<iframe class="embed-responsive-item" src=${url}></iframe>`;
      }
}

let app = new App();
$(document).ready(app.init());
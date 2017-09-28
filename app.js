"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class App {
      constructor() {
            this.videos = [];
            this.selectedVideo = null;
            this.imagenes = undefined;
            this.searchTerm = "Nombe -Wait";
            this.inputBuscar = $("#inputBuscar");
            this.btnBuscar = $("#btnBuscar");
            this.reproducir = $("#playVideo");
            this.informacion = $("#informacion");
            this.lista = $("#root");
      }
      init() {
            this.youtubeSearch(this.searchTerm);
            this.setup();
      }
      setup() {
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
                  const imageUrl = video.snippet.thumbnails.medium.url;
                  return (`<li> 
                              <p>
                                    <img class="media-object" src=${imageUrl} id="${video.id.videoId}"/>  
                                    <p class="titulo">${video.snippet.title}</p>
                                    <hr/>
                              </p>
                        </li>`);
            });
      }
      youtubeSearch(searchTerm) 
      {
          YTSearch({ key: API_KEY, term: searchTerm }, data => 
          {
              this.videos = data;
              this.selectedVideo = data[0];
              this.searchTerm = searchTerm;
              let list = this.getVideoList(this.videos);
              this.lista.append(list);
              let videoSeleccionado = this.videoSeleccionado(this.selectedVideo);
              this.reproducir.append(videoSeleccionado);
              this.imagenes = $("img");
              console.log(this.imagenes);
              this.imagenes.click((e) => {
                  this.lista.empty();
                  this.youtubeSearch(e.target.id);
              });
          });
      }
      videoSeleccionado(video) {
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            this.informacion.html(
                  `<h2 class="title">${video.snippet.title}</h2>
                  <hr/>
                  <h3 class="description">${video.snippet.description}</h3>`
            );
            return `<iframe class="embed-responsive-item" src=${url}></iframe>`;
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
$(document).ready(app.init());
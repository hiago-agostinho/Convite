// configurações de autenticação
const CLIENT_ID = '883128468855-l1pqhsi4pvrdnjked5m9pa224t9h16gv.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAmD3rZxyCA5CzgOTijslCOZpzzcT3sHcA';
const SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

// inicialização da API
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPE
  }).then(function() {
    // ouvir o clique do botão Adicionar Música
    document.getElementById('addMusicButton').addEventListener('click', addToPlaylist);
  }, function(error) {
    console.log(JSON.stringify(error, null, 2));
  });
}

// autenticação do usuário
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

// enviar solicitação HTTP POST para adicionar o vídeo à lista de reprodução
function addVideoToPlaylist(videoId, playlistId) {
  var details = {
    videoId: videoId,
    kind: 'youtube#video'
  }
  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      snippet: {
        playlistId: playlistId,
        resourceId: details
      }
    }
  });
  request.execute(function(response) {
    console.log(response);
    alert('Música adicionada à playlist com sucesso!');
  });
}

// carregar a API do cliente do YouTube e autenticar o usuário
function loadClient() {
    gapi.load('client:auth2', initClient);
    gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPE
    }).then(function() {
      // ouvir o clique do botão de autenticação
      document.getElementById('authorize-button').addEventListener('click', handleAuthClick);
    }, function(error) {
      console.log(JSON.stringify(error, null, 2));
    });
  }

// adicionar música à lista de reprodução
function addToPlaylist() {
  const videoId = document.getElementById('videoId').value;
  const playlistId = 'https://www.youtube.com/playlist?list=PLEzcYxvLqJSOzKS9ExixleaOIOSz-zpNr';
  
  // enviar solicitação HTTP POST para adicionar o vídeo à lista de reprodução
  addVideoToPlaylist(videoId, playlistId);
}

// carregar a API do cliente do YouTube
gapi.load('client', loadClient);

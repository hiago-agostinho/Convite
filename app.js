// adicionar música à lista de reprodução
function addToPlaylist() {
    const videoId = document.getElementById('videoId').value;
    const playlistId = 'https://www.youtube.com/playlist?list=PLEzcYxvLqJSOzKS9ExixleaOIOSz-zpNr';
    const accessToken = 'AIzaSyDy-hddcHf4A6LDjwLvpHBaOkoc34GINh4';
    
    // enviar solicitação HTTP POST para adicionar o vídeo à lista de reprodução
    const xhr = new XMLHttpRequest();
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&access_token=${accessToken}`;
    const data = {
      snippet: {
        playlistId: playlistId,
        resourceId: {
          kind: 'youtube#video',
          videoId: videoId
        }
      }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert('Música adicionada à playlist com sucesso!');
      }
      else {
        alert('Houve um erro ao adicionar a música à playlist');
      }
    };
    xhr.send(JSON.stringify(data));
  }
  
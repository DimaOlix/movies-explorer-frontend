class MoviesApi {
  constructor(url) {
    this.url = url;
  }

  _getResponseServer(res) {
    if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  getMovies() {
    return fetch(`${this.url}`,{
      headers: {
        'Content-type': 'application/json',
      },
      // credentials: "include",
    })
    .then((res) => {
      return this._getResponseServer(res);    
    })
  }
}

export default new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');
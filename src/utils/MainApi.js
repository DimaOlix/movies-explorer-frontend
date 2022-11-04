class MainApi {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  _getResponseServer(res) {
    if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(res.json());
    }
  };

  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      headers: {
        'Content-type': 'application/json',
        // authorization: this.token
      },
      credentials: "include",
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  };

  createMovie( movie ) {
    return fetch(`${ this.url }/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include", 
      body: JSON.stringify({ ...movie })
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  };

  deleteMovie(movieId) {
    return fetch(`${this.url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        // authorization: this.token
      },
      credentials: "include",
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  };

  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Content-type': 'application/json',
        // authorization: this.token
      },
      credentials: "include",
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  };

  creatUser(name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // authorization: this.token
      },
      credentials: "include",
      body: JSON.stringify({ 
        name: name,
        email: email,
        password: password,
       })
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  };

  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // authorization: this.token
      },
      credentials: "include",
      body: JSON.stringify({ 
        email: email,
        password: password,
       })
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  };

  editUser(name, email) {
    return fetch(`${this.url}/movies`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        // authorization: this.token
      },
      credentials: "include",
      body: JSON.stringify({ 
        name: name,
        email: email,
       })
    })
    .then((res) => {
      return this._getResponseServer(res);
    })
  };
}

export default new MainApi('https://api.dolih-diplom.student.nomoredomains.icu');


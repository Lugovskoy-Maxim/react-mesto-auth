class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(userName, userAbout) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then(this._checkResponse);
  }

  addCard(link, title) {
    return fetch(this._baseUrl + "/cards/", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeStatusLikeCard(id, isLiked) {
    const changeStatus = isLiked ? "deleteLikeCard" : "setLikeCard";
    return api[changeStatus](id);
  }

  setLikeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLikeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data, //avatar_url
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43",
  headers: {
    authorization: "73b17bd9-3a97-41a4-b24d-ab14544edf37",
    "Content-Type": "application/json",
  },
});

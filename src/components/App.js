import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../Utils/api";
import DeleteCardPopup from "./DeleteCardPopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { LoadingPopupContext } from "../context/LoadingPopupContext";
import Login from "./Login";
import Register from "./Register"

function App() {
  const [isLoadingPopup, setLoadingPopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPreviewPopupOpen, setPreviewPopupOpen] = useState(false);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    title: "",
  });
  const [toDeleteCard, setDeleteCardId] = useState({ id: "" });

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPopupOpen(true);
  };
  const handleCardDeleteClick = (card) => {
    setDeleteCardId({ id: card._id });
    setDeleteCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPopupOpen(false);
    setPreviewPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({ link: "", title: "" });
  };

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((data) => {
        setCurrentUser(data[0]); //name, about, avatar, _id
        setCards(data[1]);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }, [setCards]);

  const handlePreviewPopupClick = (src, alt) => {
    setSelectedCard({
      link: src,
      title: alt,
    });
    setPreviewPopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    return api
      .changeStatusLikeCard(card._id, isLiked)
      .then((currentCard) => {
        setCards(
          cards.map((item) => (item._id === card._id ? currentCard : item))
        );
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleAddPlaceSubmit = (link, title) => {
    setLoadingPopup(true);
    return api
      .addCard(link, title)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setAddPopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleEditProfileSubmit = (userName, userAbout) => {
    setLoadingPopup(true);
    return api
      .setUserInfo(userName, userAbout)
      .then((user) => {
        setCurrentUser(user);
        setEditProfilePopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleEditAvatarSubmit = (data) => {
    setLoadingPopup(true);
    return api
      .setUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        setEditAvatarPopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleDeleteCardSubmit = (deleteCard) => {
    setLoadingPopup(true);
    return api
      .deleteCard(deleteCard.id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deleteCard.id));
        setDeleteCardPopupOpen(false);
      })
      .finally(() => {
        setLoadingPopup(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Register/>
          {/* <Login /> */}
          {/* <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardLike={handleCardLike}
            handlePreviewPopupClick={handlePreviewPopupClick}
            onCardDelete={handleCardDeleteClick}
          /> */}
          <Footer />

          <LoadingPopupContext.Provider value={isLoadingPopup}>
            <ImagePopup
              card={selectedCard}
              isOpened={isPreviewPopupOpen}
              isClosed={closeAllPopups}
            ></ImagePopup>

            <EditAvatarPopup
              isOpened={isEditAvatarPopupOpen}
              isClosed={closeAllPopups}
              onEditAvatar={handleEditAvatarSubmit}
            />

            <AddPlacePopup
              isOpened={isAddPopupOpen}
              isClosed={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditProfilePopup
              isOpened={isEditProfilePopupOpen}
              isClosed={closeAllPopups}
              onEditProfile={handleEditProfileSubmit}
            />

            <DeleteCardPopup
              isOpened={isDeleteCardPopupOpen}
              isClosed={closeAllPopups}
              onDeletePhoto={handleDeleteCardSubmit}
              card={toDeleteCard}
            />
          </LoadingPopupContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

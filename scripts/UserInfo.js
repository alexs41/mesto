export default class UserInfo {

    constructor( { nameSelector, infoSelector } ) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);

        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__like-button');
        
    }

    getUserInfo() {
        const user;
        user.name = this._name.textContent;
        user.info = this._info.textContent;
        return { user };
    }

    setUserInfo(name, info) {
        this._name.textContent = name;
        this._info.textContent = info;
    }

}
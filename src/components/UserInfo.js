export default class UserInfo {
    constructor( { nameSelector, infoSelector } ) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }
    getUserInfo() { // получаем информацию из профиля
        return { "full-name-input": this._name.textContent, "description-input": this._info.textContent };
    }
    setUserInfo(user) {// вставляем информацию в профиль
        this._name.textContent = user["full-name-input"];
        this._info.textContent = user["description-input"];
    }
}
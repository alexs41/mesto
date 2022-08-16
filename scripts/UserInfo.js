export default class UserInfo {
    constructor( { nameSelector, infoSelector } ) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }
    getUserInfo() { // получаем информацию из профиля
        return { name: this._name.textContent, info: this._info.textContent };
    }
    setUserInfo( array ) {// вставляем информацию в профиль
        this._name.textContent = array[0];
        this._info.textContent = array[1];
    }
}
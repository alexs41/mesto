export default class UserInfo {
    constructor( { nameSelector, infoSelector, avatarSelector } ) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._cohort = undefined;
        this.id = undefined;
    }
    getUserInfo() { // получаем информацию из профиля
        return { "name": this._name.textContent, "about": this._info.textContent };

    }
    // setUserInfo(user) {// вставляем информацию в профиль
    //     this._name.textContent = user["full-name-input"];
    //     this._info.textContent = user["description-input"];
    // }
    setUserInfo(user) {// вставляем информацию в профиль
        if (user.name) { this._name.textContent = user.name;};
        if (user.about) { this._info.textContent = user.about;};
        if (user.avatar) { this._avatar.src = user.avatar;};
        if (user.cohort) { this._cohort = user.cohort;};
        if (user._id) { this.id = user._id;};
    }
}




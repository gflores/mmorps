export const autoUserCreate = () => {
    var id = Math.floor((Math.random() * 1000000000)).toString();
    var password = "password";

    Accounts.createUser({
        username: id,
        password: password
    });
}

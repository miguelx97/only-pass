export class User {
    uid:string;
    username:string;
    password:string;

    constructor(){}

    static build(uid:string, username:string, password:string):User{
        const user = new User()
        user.uid = uid;
        user.username = username;
        user.password = password;
        return user;
    }
}

export class Credential {
    id:string;
    title:string;
    usernameOrEmail:string;
    password:string;
    url:string;

    build(id:string, title:string, usernameOrEmail:string, password:string, url:string){
        this.id = id;
        this.title = title;
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        this.url = url;
    }
}

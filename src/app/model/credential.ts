export class Credential {
    id:string;
    title:string;
    usernameOrEmail:string;
    password:string;
    url:string;
    options:{show:boolean};

    constructor(){}

    build(id:string, title:string, usernameOrEmail:string, password:string, url:string){
        this.id = id;
        this.title = title;
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        this.url = url;
    }

    static copy(crecential:Credential):Credential{
        const newCredential = new Credential();
        newCredential.id = crecential.id;
        newCredential.title = crecential.title;
        newCredential.usernameOrEmail = crecential.usernameOrEmail;
        newCredential.password = crecential.password;
        newCredential.url = crecential.url;
        return newCredential;
    }
}



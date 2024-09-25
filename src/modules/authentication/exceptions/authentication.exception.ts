class UserNotFoundException extends Error {
    constructor() {
        super("Usuário não encontrado!");
        this.name = "UserNotFoundException";
    }
}

class InvalidPasswordException extends Error {
    constructor() {
        super("Senha inválida!");
        this.name = "InvalidPasswordException";
    }
}

class FirstLoginAlreadyDoneException extends Error {
    constructor() {
        super("Já fez login pela primeira vez!");
        this.name = "FirstLoginAlreadyDoneException";
    }
}

class UserAlreadExistsException extends Error {
    constructor() {
        super("Usuário ja registrado no sistema!");
        this.name = "UserAlreadExistsException";
    }
}
interface IAllUsers {
    id: number;
    name: string;
}

export class AllUsers implements IAllUsers {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
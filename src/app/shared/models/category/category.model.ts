export interface ICategory {
    id?: number;
    name: string;
    path: string;
    image: string;
}

export class Category implements ICategory {
    constructor(
        public name: string,
        public path: string,
        public image: string,
        public id: number
    ) { }
}
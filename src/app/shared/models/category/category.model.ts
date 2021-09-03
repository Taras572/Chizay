export interface ICategory {
    id?: number;
    name: string;
    path: string;
    icon: string;
}

export class Category implements ICategory {
    constructor(
        public name: string,
        public path: string,
        public icon: string
    ) { }
}
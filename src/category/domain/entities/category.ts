
export type ICategoryProps = {
    name: string;
    is_active?: boolean;
    description?: string;
    created_at?: Date;
}

export class Category {
    constructor(public readonly props: ICategoryProps){}

    get name(): string{
        return this.props.name
    }

    get description(): string | undefined{
        return this.props.description
    }

    get is_active(): boolean | undefined{
        return this.props.is_active
    }

    get created_at(): Date | undefined{
        return this.props.created_at
    }
}
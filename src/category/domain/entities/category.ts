import UniqueEntityId from "../../../shared/domain/unique-entity-id.vo";

export type ICategoryProps = {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
};

export class Category {
  public readonly id: UniqueEntityId;
  constructor(public readonly props: ICategoryProps, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
    this.props.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(description: string) {
    this.props.description = description ?? null;
  }

  get is_active(): boolean | undefined {
    return this.props.is_active;
  }

  private set is_active(is_active: boolean) {
    this.props.is_active = is_active ?? null;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
  }
}

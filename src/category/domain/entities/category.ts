import Entity from "../../../shared/domain/entities/entity";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id.vo";

export type ICategoryProps = {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
};

export class Category extends Entity<ICategoryProps> {
  constructor(public readonly props: ICategoryProps, id?: UniqueEntityId) {
    if(!props.name){
      throw new Error("Name is required")
    }
    if(props.name.length > 255){
      throw new Error("Name must be less than 255")
    }
    super(props, id)
    this.props.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string): void{
    if(name){
      throw new Error("Name is required")
    }
    if(name.length > 255){
      throw new Error("Name must be less than 255")
    }
    this.props.name = name;
    this.description = description
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

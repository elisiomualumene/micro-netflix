import Entity from "../../../shared/domain/entities/entity";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id.vo";
import ValidatorRules from "../../../shared/validators/validator-rules";

export type ICategoryProps = {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
};

export class Category extends Entity<ICategoryProps> {
  constructor(public readonly props: ICategoryProps, id?: UniqueEntityId) {
    Category.validate(props)
    super(props, id);
    this.props.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string): void {
    Category.validate({name, description, is_active: this.is_active})
    this.props.name = name;
    this.description = description;
  }

  static validate(props: Omit<ICategoryProps, 'created_at'>){
    ValidatorRules.values(props.name, "name").required().string();
    ValidatorRules.values(props.description, "description").string()
    ValidatorRules.values(props.is_active, "is_active").boolean()
  }

  activate(){
    this.props.is_active = true
  }

  deactivate(){
    this.props.is_active = false
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

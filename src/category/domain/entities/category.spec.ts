import { Category } from "./category";
import { omit } from "lodash";

describe("Category Test", () => {
  beforeEach(() => {
    Category.validate = jest.fn()
  })
  it("should be able to create a category entity", () => {

    let category = new Category({ name: "Movie" });

    let props = omit(category.props, "created_at");

    expect(Category.validate).toHaveBeenCalled()

    expect(props).toStrictEqual({
      name: "Movie",
      description: undefined,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });

    let created_at = new Date();

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  it("should be able to update a category", () => {
    const category = new Category({name: "Movie"});
    category.update("Documentary", "some description");
    expect(Category.validate).toHaveBeenCalledTimes(2)
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description")
  })

  it("should be able to active a category", () => {
    const category = new Category({name: "Filme", is_active: false});

    category.activate()
    expect(category.is_active).toBeTruthy()
  })

  it("should be able to deactivate a category", () => {
    const category = new Category({name: "Filme", is_active: true});

    category.deactivate()
    expect(category.is_active).toBeFalsy()
  })
  it("Getter of name field", () => {
    const category = new Category({ name: "Movie" });

    expect(category.name).toBe("Movie");
  });

  it("Getter and setter of description field", () => {
    const category = new Category({
      name: "Movie",
      description: "some description",
    });

    expect(category.description).toBe("some description");
  });

  it("Getter and setter of description field 2", () => {
    const category10 = new Category({ name: "Movie" });

    expect(category10.description).toBeUndefined();
  });
});

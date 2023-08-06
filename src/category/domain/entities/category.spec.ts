import { Category } from "./category"

describe("Category Test", () => {
    it("should be able to create a category entity", () => {
        // triple AAA - Arrange Act Assert

        const props = {
            name: "Movie", 
            description: "description",
             is_active: true,
            created_at: new Date()
        }

        const category = new Category(props)

        expect(category).toStrictEqual({props})
    })
})
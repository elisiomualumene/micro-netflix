import { InvalidUuidError } from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import {validate} from "uuid"

/* function spyValidateMethod(){
    return jest.spyOn(UniqueEntityId.prototype as any, "validate");
} */

describe("Unique Unit Tests", () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

   /*  beforeEach(() => {
        validateSpy.mockClear()
    }) */

  it("should throw error when uuid is invalid", () => {
    //const validateSpy = spyValidateMethod()
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
   // const validateSpy = spyValidateMethod()
    const uuid = "b464a3ad-b947-4b28-a4af-a99d3bbc6552";
    const vo = new UniqueEntityId(uuid);

    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate a uuid without passed in constructor", () => {
    //const validateSpy = spyValidateMethod()
    const vo = new UniqueEntityId();

    expect(validate(vo.value)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled();
  });
});

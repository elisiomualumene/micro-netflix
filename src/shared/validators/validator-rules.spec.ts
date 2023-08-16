import ValidationError from "../errors/validation-error";
import ValidatorRules from "./validator-rules";

type ExpectedValidationRules = {
  value: any;
  error: ValidationError;
  rule: keyof ValidatorRules;
  params?: any[];
};

function assertIsInvalid({
  value,
  rule,
  error,
  params = [],
}: ExpectedValidationRules) {
  expect(() => {
    const validator = ValidatorRules.values(value, "field");
    const method = validator[rule];
    //@ts-ignore
    method.apply(validator, params);
  }).toThrow(error);
}

function assertIsValid({
  value,
  rule,
  error,
  params = [],
}: ExpectedValidationRules) {
  expect(() => {
    const validator = ValidatorRules.values(value, "field");
    const method = validator[rule];
    //@ts-ignore
    method.apply(validator, params);
  }).not.toThrow(error);
}

describe("Validators Rules Unit Tests", () => {
  test("value method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    let arrange: any[] = [null, undefined, ""];
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });
    //success
    arrange = ["test", 5, false];
    arrange.forEach((item) => {
      assertIsValid({
        value: item,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });
  });

  test("string validation rule", () => {
    let arrange: any[] = [0, 5, false];

    const error = new ValidationError(`The field must be a string`)
    
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item,
        rule: "string",
        error
      });
    });


    arrange = ["0", "zero", "test", null, undefined];
    arrange.forEach((item) => {
      assertIsValid({
        value: item,
        rule: "string",
        error
      });
    });
  });

  test("maxLength validation rule", () => {
    let arrange: any[] = ["test1234"];
    let error = new ValidationError(`The max length of property field is 5 characters`)
    
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item,
        rule: "maxLength",
        error,
        params: [5]
      });
    });


    arrange = ["test1", "test2", null, undefined];
    arrange.forEach((item) => {
      assertIsValid({
        value: item,
        rule: "maxLength",
        error,
        params: [5]
      });
    });
  });
  test("boolean validation rule", () => {
    let arrange: any[] = ["test", "test2"];
    let error = new ValidationError(`The field must be a boolean`)
    
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item,
        rule: "boolean",
        error,
      });
    });


    arrange = [true, false];
    arrange.forEach((item) => {
      assertIsValid({
        value: item,
        rule: "boolean",
        error,
      });
    });
  })
});

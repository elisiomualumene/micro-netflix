import {validate} from "uuid"

import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";

class StubEntity extends Entity<{prop1: string; prop2: number}>{}

describe("Entity Unit Tests", () => {
    it("should be able to set props id", () => {
        const arrange = {prop1: "prop1 value", prop2: 10}
        const entity = new StubEntity(arrange)
        expect(entity.props).toStrictEqual(arrange)
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
        expect(entity.id).not.toBeNull()
        expect(validate(entity.id)).toBeTruthy()
    })

    it("should be able to accept a valid uuid", () => {
        const arrange = {prop1: "prop1 value", prop2: 10}
        const uniqueEntityId = new UniqueEntityId()
        const entity = new StubEntity(arrange, uniqueEntityId) 

        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId) 
        expect(entity.id).toBe(uniqueEntityId.value)
    })

    it("should be able to convert to a javascript Object Notation", () => {
        const arrange = {prop1: "prop1 value", prop2: 10}
        const uniqueEntityId = new UniqueEntityId()
        const entity = new StubEntity(arrange, uniqueEntityId) 
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange
        })
    })
})
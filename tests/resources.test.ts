import assert from "node:assert/strict";
import { test } from "node:test";
import { parseResourceInput, parseResourceQuery, ResourceError, validateResourceId } from "../src/lib/resources/validation";

const input = { name: "  Meeting Room  ", category: "meeting", location: " Floor 4 ", capacity: 16 };

test("resource input trims values and supplies safe defaults", () => {
  assert.deepEqual(parseResourceInput(input), { name: "Meeting Room", category: "meeting", location: "Floor 4", capacity: 16, status: "ACTIVE", description: null, floor: null, imageUrl: null });
});

test("invalid resource fields return structured errors", () => {
  for (const value of [{ ...input, name: " " }, { ...input, name: "Null\0byte" }, { ...input, category: "admin" }, { ...input, capacity: -1 }, { ...input, capacity: 1.5 }, { ...input, capacity: "10" }, { ...input, status: "FREE" }, { ...input, id: "changed" }, { ...input, imageUrl: "javascript:alert(1)" }, { ...input, imageUrl: "https://user:pass@example.com/img.png" }]) {
    assert.throws(() => parseResourceInput(value), error => error instanceof ResourceError && error.status === 400 && !!error.fields);
  }
});

test("partial updates retain omitted fields and reject empty updates", () => {
  assert.deepEqual(parseResourceInput({ status: "INACTIVE" }, true), { status: "INACTIVE" });
  assert.deepEqual(parseResourceInput({ description: "" }, true), { description: null });
  assert.throws(() => parseResourceInput({}, true), ResourceError);
});

test("search filters and pagination are bounded", () => {
  assert.equal(parseResourceQuery(new URLSearchParams("q=Room&category=meeting&status=ACTIVE&page=2&pageSize=5")).page, 2);
  for (const query of ["category=unknown", "status=unknown", "page=0", "page=1.5", "pageSize=101", "capacity=unknown", "q=bad%00query", "floor=bad%00floor", `q=${"x".repeat(121)}`]) {
    assert.throws(() => parseResourceQuery(new URLSearchParams(query)), ResourceError);
  }
});

test("IDs must be UUIDs", () => {
  validateResourceId("c4e31c0c-c1b4-4a1b-a946-1191053ed533");
  assert.throws(() => validateResourceId("resource-1"), ResourceError);
});

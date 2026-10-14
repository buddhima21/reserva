import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { loadEnvConfig } from "@next/env";
import { getPrisma } from "../src/lib/prisma";
import { createResource, getResource, listResources, updateResource, deactivateResource } from "../src/services/resources";

loadEnvConfig(process.cwd());
const prisma = getPrisma();
class TestRollback extends Error {}
let stage = "transaction setup";

async function main() {
  let assertionsPassed = false;
  try {
    await prisma.$transaction(async tx => {
      const name = `CRUD verification ${randomUUID()}`;
      stage = "create and read";
      const created = await createResource({ name, category: "meeting", location: "Test transaction", description: null, capacity: 16, status: "ACTIVE", floor: "test", imageUrl: null }, tx);
      assert.equal((await getResource(created.id, tx)).name, name);
      stage = "search and filters";
      const results = await listResources(new URLSearchParams({ q: name.toLowerCase(), category: "meeting", status: "ACTIVE", floor: "test", capacity: "large", pageSize: "1" }), tx);
      assert.equal(results.total, 1);
      assert.equal(results.items[0].id, created.id);
      assert.equal((await listResources(new URLSearchParams({ q: name, category: "equipment" }), tx)).total, 0);
      stage = "update, deactivate and reactivate";
      const updated = await updateResource(created.id, { name: `${name} edited`, capacity: 8 }, tx);
      assert.equal(updated.capacity, 8);
      assert.equal((await deactivateResource(created.id, tx)).status, "INACTIVE");
      assert.equal((await getResource(created.id, tx)).status, "INACTIVE");
      assert.equal((await updateResource(created.id, { status: "ACTIVE" }, tx)).status, "ACTIVE");
      stage = "missing records";
      await assert.rejects(getResource(randomUUID(), tx), { status: 404 });
      await assert.rejects(updateResource(randomUUID(), { status: "INACTIVE" }, tx), { status: 404 });
      assertionsPassed = true;
      throw new TestRollback();
    }, { maxWait: 10000, timeout: 20000 });
  } catch (error) { if (!(error instanceof TestRollback)) throw error; }
  assert.ok(assertionsPassed);
  console.log("Resource create/read/update/deactivate/reactivate, combined search filters, and missing-record checks passed. All test writes rolled back.");
}

main().catch(error => { console.error(`Resource integration check failed at ${stage} (${error?.code ?? error?.name ?? "unknown"}). No database credentials were printed.`); process.exitCode = 1; }).finally(() => prisma.$disconnect());

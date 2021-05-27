import { Collection } from "../mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";







const collect = new Collection<string, number>();




for (let i = 0; i < 5; i++) {
    collect.set(i.toString(), i);
}


Deno.test("Map", () => {
    assertEquals(
        collect
            .map((v) => v * 2),
        [0, 2, 4, 6, 8]
    );
});

Deno.test("Filter", () => {
    assertEquals(
        collect.filter((value) => value === 2).size,
        1
    );
});


Deno.test("Some", () => {
    assertEquals(
        collect.some((value) => typeof value === "string"),
        false
    );
});

Deno.test("Every", () => {
    assertEquals(
        collect.every((value) => typeof value === "number"),
        true
    );
});

Deno.test("Equals", () => {
    const clone = collect.clone();

    assertEquals(
        collect.equals(clone),
        true
    );
});

Deno.test("concat", () => {
    const otherColl = new Collection<string, number>();
    const otherCollSec = new Collection<string, number>();

    for (let i = 4; i < 10; i++)
        otherColl.set(i.toString(), i);

    for (let i = 9; i < 15; i++)
        otherCollSec.set(i.toString(), i);

    assertEquals(
        collect.concat(otherColl, otherCollSec).size,
        15
    );
});

Deno.test("Difference", () => {
    const other = new Collection<string, number>();

    for (let i = 4; i < 10; i++)
        other.set(i.toString(), i);

    assertEquals(
        collect.difference(other).size,
        9
    );
});


Deno.test("Each", () => {
    assertEquals(
        collect.each(() => { }),
        collect
    );
});

Deno.test("Array", () => {
    assertEquals(
        collect.array(),
        [0, 1, 2, 3, 4]
    );
});

Deno.test("KeyArray", () => {
    assertEquals(
        collect.keyArray(),
        ["0", "1", "2", "3", "4"]
    );
});

Deno.test("First without amount", () => {
    assertEquals(
        collect.first(),
        0
    );
});

Deno.test("First with amount", () => {
    assertEquals(
        collect.first(3),
        [0, 1, 2]
    );
});

Deno.test("First with negative amount", () => {
    assertEquals(
        collect.first(-2),
        [3, 4]
    );
});

Deno.test("FirstKey without amount", () => {
    assertEquals(
        collect.firstKey(),
        "0"
    );
});

Deno.test("FirstKey with amount", () => {
    assertEquals(
        collect.firstKey(3),
        ["0", "1", "2"]
    );
});

Deno.test("FirstKey with negative amount", () => {
    assertEquals(
        collect.firstKey(-2),
        ["3", "4"]
    );
});

Deno.test("Last without amount", () => {
    assertEquals(
        collect.last(),
        4
    );
});

Deno.test("Last with amount", () => {
    assertEquals(
        collect.last(2),
        [3, 4]
    );
});

Deno.test("Last with negative amount", () => {
    assertEquals(
        collect.last(-2),
        [0, 1]
    );
});

Deno.test("LastKey without amount", () => {
    assertEquals(
        collect.lastKey(),
        "4"
    );
});

Deno.test("LastKey with amount", () => {
    assertEquals(
        collect.lastKey(2),
        ["3", "4"]
    );
});

Deno.test("LastKey with negative amount", () => {
    assertEquals(
        collect.lastKey(-2),
        ["0", "1"]
    );
});

Deno.test("FlatMap", () => {
    const coll = new Collection();

    assertEquals(
        collect.flatMap((v) => coll.set(v, v)),
        coll
    );
});

Deno.test("Intersect", () => {
    const clone = new Collection<string, number>();

    for (let i = 2; i < 5; i++) {
        clone.set(i.toString(), i);
    }

    assertEquals(
        collect.intersect(clone).size,
        3
    );
});


Deno.test("MapValues", () => {
    const result = collect.mapValues<number>((v) => v);
    assertEquals(result, collect);
});

Deno.test("Partition", () => {
    console.log(collect.partition((v) => v < 3));
});

Deno.test("Random without amount", () => {
    for (let i = 0; i < 2; i++)
        console.log(collect.random());
});

Deno.test("Random with amount", () => {
    console.log(collect.random(10));
});


Deno.test("RandomKey without amount", () => {
    for (let i = 0; i < 2; i++)
        console.log(collect.randomKey());
});

Deno.test("RandomKey with amount", () => {
    console.log(collect.randomKey(10));
});


Deno.test("Reduce", () => {
    assertEquals(
        collect.reduce<number>((a, c) => a + c, 0),
        10
    );
});


Deno.test("Sort", () => {
    console.log(collect);
    collect.sort((fv, sv) => sv - fv);
    console.log(collect);
});

Deno.test("Sorted", () => {
    console.log(collect);
    collect.sort((fv, sv) => fv - sv);
    console.log(collect);
});


Deno.test("Sweep", () => {
    assertEquals(
        collect.sweep((v) => typeof v === "number"),
        5
    );
});
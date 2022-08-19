import { assertEquals } from 'https://deno.land/std@0.152.0/testing/asserts.ts';
import { Collection } from '../Collection.ts';

const collection = new Collection<string, number>();
for (let i = 0; i < 5; i++) collection.set(i.toString(), i);

Deno.test('Collection.map', () => {
  const result = collection.map((key, value) => value * 2);
  assertEquals(result.size, collection.size);
  for (const [key, value] of result)
    assertEquals(value, collection.get(key)! * 2);
});

Deno.test('Collection.find', () => {
  const result = collection.find(
    (key, value) => value % 2 === 0 && key !== '0'
  );
  assertEquals(result, ['2', 2]);
});

Deno.test('Collection.findKey', () => {
  const result = collection.findKey(
    (key, value) => value % 2 === 0 && key !== '0'
  );
  assertEquals(result, '2');
});

Deno.test('Collection.findValue', () => {
  const result = collection.findValue(
    (key, value) => value % 2 === 0 && key !== '0'
  );
  assertEquals(result, 2);
});

Deno.test('Collection.filter', () => {
  const result = collection.filter((key, value) => value % 2 === 0);
  assertEquals(result.size, 3);
  assertEquals(result.get('0'), 0);
  assertEquals(result.get('2'), 2);
  assertEquals(result.get('4'), 4);
});

Deno.test('Collection.any', () => {
  const result = collection.any((key, value) => value % 2 === 0);
  assertEquals(result, true);
});

Deno.test('Collection.every', () => {
  const result = collection.every((key, value) => value % 2 === 0);
  assertEquals(result, false);
});

Deno.test('Collection.equals', () => {
  const other = new Collection<string, number>();
  for (let i = 0; i < 5; i++) other.set(i.toString(), i);
  const result = collection.equals(other);
  assertEquals(result, true);
});

Deno.test('Collection.difference', () => {
  const other = new Collection<string, number>();
  for (let i = 0; i < 5; i++) other.set((i * 2).toString(), i);
  const result = collection.difference(other);
  assertEquals(result.size, 2);
});

Deno.test('Collection.first', () => {
  assertEquals(collection.first(), ['0', 0]);
  assertEquals(collection.first(2), [
    ['0', 0],
    ['1', 1],
  ]);
});

Deno.test('Collection.firstKey', () => {
  assertEquals(collection.firstKey(), '0');
  assertEquals(collection.firstKey(2), ['0', '1']);
});

Deno.test('Collection.firstValue', () => {
  assertEquals(collection.firstValue(), 0);
  assertEquals(collection.firstValue(2), [0, 1]);
});

Deno.test('Collection.last', () => {
  assertEquals(collection.last(), ['4', 4]);
  assertEquals(collection.last(2), [
    ['3', 3],
    ['4', 4],
  ]);
});

Deno.test('Collection.lastKey', () => {
  assertEquals(collection.lastKey(), '4');
  assertEquals(collection.lastKey(2), ['3', '4']);
});

Deno.test('Collection.lastValue', () => {
  assertEquals(collection.lastValue(), 4);
  assertEquals(collection.lastValue(2), [3, 4]);
});

Deno.test('Collection.random', () => {
  assertEquals(collection.random()!.length, 2);
  assertEquals(collection.random(2)!.length, 2);
});

Deno.test('Collection.randomKey', () => {
  assertEquals(collection.randomKey()!.length, 1);
  assertEquals(collection.randomKey(2)!.length, 2);
});

Deno.test('Collection.randomKey', () => {
  assertEquals(typeof collection.randomKey(), 'string');
  assertEquals(collection.randomKey(2)!.length, 2);
});

Deno.test('Collection.randomValue', () => {
  assertEquals(typeof collection.randomValue(), 'number');
  assertEquals(collection.randomValue(2)!.length, 2);
});

Deno.test('Collection.reduce', () => {
  assertEquals(
    collection.reduce((acc, [key, val]) =>
      Array.isArray(acc) ? acc[1] + val : (acc as number) + val
    ),
    10
  );
});

Deno.test('Collection.sweep', () => {
  const clone = collection.clone();
  assertEquals(
    clone.sweep((key, val) => val % 2 === 0),
    3
  );
  assertEquals(clone.size, 2);
});

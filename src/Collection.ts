/**
 * @class
 * @lassdesc - Extended Map class
 */
export class Collection<K, V> extends Map<K, V> {
  declare ['constructor']: typeof Collection;

  /**
   * Processes all values from this collection in the new collection. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map}
   * @param fn - Function to be called on each item in the collection.
   * @param thisArg - ThisArg for the function.
   * @returns New collection with the results of the function.
   */
  public map<T, This>(
    fn: IteratedCallback<K, V, this, T>,
    thisArg?: This
  ): Collection<K, T> {
    const result = new this.constructor[Symbol.species]<K, T>();

    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);

    for (const [key, value] of this) result.set(key, fn(key, value, this));

    return result;
  }

  /**
   *
   * Returns the key and value of the first item in the this collection where predicate is true, and undefined otherwise. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find}
   * @param fn - Function to be called on each item in the collection.
   * @param thisArg - ThisArg for the function.
   * @returns The key and value of the first item in the this collection where predicate is true, and undefined otherwise.
   */
  public find<This>(
    fn: IteratedCallback<K, V, this, boolean>,
    thisArg?: This
  ): [K, V] | undefined {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    for (const [key, value] of this)
      if (fn(key, value, this)) return [key, value];
    return undefined;
  }

  /**
   *
   * Returns the value of the first item in the this collection where predicate is true, and undefined otherwise. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find}
   * @param fn - Function to be called on each item in the collection.
   * @param thisArg - ThisArg for the function.
   * @returns The value of the first item in the this collection where predicate is true, and undefined otherwise.
   */
  public findKey<This>(
    fn: IteratedCallback<K, V, this, boolean>,
    thisArg?: This
  ) {
    return this.find(fn, thisArg)?.[0];
  }

  /**
   * Return the value of the first item in the this collection where predicate is true, and undefined otherwise.
   * @param fn - Function to be called on each item in the collection.
   * @param thisArg - ThisArg for the function.
   * @returns The value of the first item in the this collection where predicate is true, and undefined otherwise.
   */
  public findValue<This>(
    fn: IteratedCallback<K, V, this, boolean>,
    thisArg?: This
  ) {
    return this.find(fn, thisArg)?.[1];
  }

  /**
   *
   * Filters this collection by the given callback function and returns a new collection. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
   * @param fn - Function to be called on each item in the collection.
   * @param thisArg - ThisArg for the function.
   * @returns New collection with the values that satisfy the condition.
   */
  public filter<This>(
    fn: IteratedCallback<K, V, this, boolean>,
    thisArg?: This
  ) {
    const result = new this.constructor[Symbol.species]<K, V>();
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    for (const [key, value] of this)
      if (fn(key, value, this)) result.set(key, value);
    return result;
  }

  /**
   *
   * Determines whether the specified callback function returns true for any item of this collection. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some}
   * @param fn - Function to be called on each item in the collection.
   * @param thisArg - ThisArg for the function.
   * @returns Whether the specified callback function returns true for any item of this collection.
   */
  public any<This>(fn: IteratedCallback<K, V, this, boolean>, thisArg?: This) {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    for (const [key, value] of this) if (fn(key, value, this)) return true;
    return false;
  }

  /**
   *
   * Determines whether all the items of this collection satisfy the specified test. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every}
   * @param fn - Function to be called on each item in the collection.
   * @param thisArg - ThisArg for the function.
   * @returns Whether all the items of this collection satisfy the specified test.
   */
  public every<This>(
    fn: IteratedCallback<K, V, this, boolean>,
    thisArg?: This
  ): boolean {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    for (const [key, value] of this) if (!fn(key, value, this)) return false;
    return true;
  }

  /**
   *
   * Check if two collections are equal.
   * @param other - Other collection to check equality.
   * @returns Whether this collection is equal to the other collection.
   */
  public equals(other: Collection<K, V>) {
    if (this.size !== other.size) return false;
    for (const [key, value] of this)
      if (!other.has(key) || other.get(key) !== value) return false;
    return true;
  }

  /**
   *
   * Get differences that are in this collection and not in the other collection.
   * @param other - Other collection to filter.
   * @returns New collection with the differences.
   */
  public difference(other: Collection<K, V>) {
    const result = new this.constructor[Symbol.species]<K, V>();
    for (const [key, value] of this)
      if (!other.has(key)) result.set(key, value);
    return result;
  }

  /**
   *
   * Performs the specified action for each item in this collection. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach} but it returns this collection.
   * @param fn - Function to be called on each item in the collection.
   * @returns This collection.
   */
  public each<This>(fn: IteratedCallback<K, V, this, void>, thisArg?: This) {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    for (const [key, value] of this) fn(key, value, this);
    return this;
  }

  /**
   *
   * Get keys of this collection.
   * @returns Keys of this collection.
   */
  public keyArray(): K[] {
    return [...this.keys()];
  }

  /**
   *
   * Get values of this collection.
   * @returns Values of this collection.
   */
  public valueArray(): V[] {
    return [...this.values()];
  }

  /**
   *
   * Get keys and values of this collection.
   * @returns Array of [key, value] pairs.
   */
  public array() {
    return [...this];
  }

  public first(): [K, V] | undefined;
  public first(amount: number): [K, V][];
  /**
   *
   * Get the first items from this collection.
   * @param amount - Amount of items to return.
   * @returns Array with first elements by amount.
   */
  public first(amount?: number): [K, V] | [K, V][] | undefined {
    const pairs = this.array();
    if (typeof amount === 'undefined') return pairs[0];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, pairs.length);
    return pairs.slice(0, amount);
  }

  public firstKey(): K | undefined;
  public firstKey(amount: number): K[];
  /**
   *
   * Get the first keys from this collection.
   * @param amount - Amount of keys to return.
   * @returns Array with first keys by amount.
   */
  public firstKey(amount?: number): K | K[] | undefined {
    const keys = this.keyArray();
    if (typeof amount === 'undefined') return keys[0];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, keys.length);
    return keys.slice(0, amount);
  }

  public firstValue(): V | undefined;
  public firstValue(amount: number): V[];
  /**
   *
   * Get the first values from this collection.
   * @param amount - Amount of values to return.
   * @returns Array with first values by amount.
   */
  public firstValue(amount?: number): V | V[] | undefined {
    const values = this.valueArray();
    if (typeof amount === 'undefined') return values[0];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, values.length);
    return values.slice(0, amount);
  }

  public last(): [K, V] | undefined;
  public last(amount: number): [K, V][];
  /**
   *
   * Get the last items from this collection.
   * @param amount - Amount of items to return.
   * @returns Array with last elements by amount.
   */
  public last(amount?: number): [K, V] | [K, V][] | undefined {
    const pairs = this.array();
    if (typeof amount === 'undefined') return pairs[pairs.length - 1];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, pairs.length);
    return pairs.slice(-amount);
  }

  public lastKey(): K | undefined;
  public lastKey(amount: number): K[];
  /**
   *
   * Get the last keys from this collection.
   * @param amount - Amount of keys to return.
   * @returns Array with last keys by amount.
   */
  public lastKey(amount?: number): K | K[] | undefined {
    const keys = this.keyArray();
    if (typeof amount === 'undefined') return keys[keys.length - 1];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, keys.length);
    return keys.slice(-amount);
  }

  public lastValue(): V | undefined;
  public lastValue(amount: number): V[];
  /**
   *
   * Get the last values from this collection.
   * @param amount - Amount of values to return.
   * @returns Array with last values by amount.
   */
  public lastValue(amount?: number): V | V[] | undefined {
    const values = this.valueArray();
    if (typeof amount === 'undefined') return values[values.length - 1];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, values.length);
    return values.slice(-amount);
  }

  public random(): [K, V] | undefined;
  public random(amount: number): [K, V][];
  /**
   *
   * Get random items from this collection.
   * @param amount - Amount of items to return.
   * @returns Array with random elements by amount.
   */
  public random(amount?: number): [K, V] | [K, V][] | undefined {
    const pairs = this.array();
    if (typeof amount === 'undefined')
      return pairs[Math.floor(Math.random() * pairs.length)];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, pairs.length);
    return Array.from(
      { length: amount },
      () => pairs[Math.floor(Math.random() * pairs.length)]
    );
  }

  public randomKey(): K | undefined;
  public randomKey(amount: number): K[];
  /**
   *
   * Get random keys from this collection.
   * @param amount - Amount of keys to return.
   * @returns Array with random keys by amount.
   */
  public randomKey(amount?: number): K | K[] | undefined {
    const keys = this.keyArray();
    if (typeof amount === 'undefined')
      return keys[Math.floor(Math.random() * keys.length)];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, keys.length);
    return Array.from(
      { length: amount },
      () => keys[Math.floor(Math.random() * keys.length)]
    );
  }

  public randomValue(): V | undefined;
  public randomValue(amount: number): V[];
  /**
   *
   * Get random values from this collection.
   * @param amount - Amount of values to return.
   * @returns Array with random values by amount.
   */
  public randomValue(amount?: number): V | V[] | undefined {
    const values = this.valueArray();
    if (typeof amount === 'undefined')
      return values[Math.floor(Math.random() * values.length)];
    if (amount < 0) throw new Error('Amount must be positive');
    amount = Math.min(amount, values.length);
    return Array.from(
      { length: amount },
      () => values[Math.floor(Math.random() * values.length)]
    );
  }

  /**
   *
   * Calls the specified callback function for all the items in this collection. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. Like @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce}
   * @param fn - Function to execute on each item.
   * @param initalValue - Initial value to accumulate.
   * @param thisArg - Value to use as this when executing callback.
   * @returns Result of the accumulated value.
   */
  public reduce<T, This>(
    fn: (accumulator: T, value: [K, V], collection: this) => T,
    initalValue?: T,
    thisArg?: This
  ): T {
    let accumulator: T =
      typeof initalValue === 'undefined'
        ? (this.first() as unknown as T)
        : initalValue;

    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    for (const pairs of this) {
      accumulator = fn(accumulator, pairs, this);
    }
    return accumulator;
  }

  /**
   *
   * Deletes items from this collection based on filtering.
   * @param fn - Function to execute on each item.
   * @param thisArg - Value to use as this when executing callback.
   * @returns Count of removed items.
   */
  public sweep<This>(
    fn: IteratedCallback<K, V, this, boolean>,
    thisArg?: This
  ): number {
    if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
    let removed = 0;
    for (const [key, value] of this) {
      if (fn(key, value, this)) this.delete(key), removed++;
    }
    return removed;
  }

  /**
   * Clone this collection.
   * @returns Clone of this collection.
   */
  public clone() {
    return new this.constructor[Symbol.species](this);
  }

  public static get [Symbol.species]() {
    return Collection;
  }

  public get [Symbol.toStringTag]() {
    return 'Collection';
  }

  public [Symbol.toPrimitive](hint: string | number) {
    return hint === 'number' ? this.size : `Collection (${this.size})`;
  }
}

export type IteratedCallback<K, V, C, R> = (
  key: K,
  value: V,
  collection: C
) => R;

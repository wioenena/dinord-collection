







/**
 *
 * Improved utility map.
 * @export
 * @class Collection
 * @extends {Map<K, V>}
 * @template K
 * @template V
 */
export class Collection<K, V> extends Map<K, V> {

    /**
     * Like this [Array.map()]
     * Navigates through the collection and returns the data as an array according to the specified function.
     * @param {(value: V, key: K, collection: this) => unknown} fn
     * @returns {unknown[]}
     * @memberof Collection
     */
    public map<T>(fn: (value: V, key: K, collection: this) => T): T[];
    public map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[];
    public map<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): T[] {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        const result: T[] = [];
        for (const [key, value] of this) {
            result.push(fn(value, key, this));
        }

        return result;
    }

    /**
     * Like this [Array.filter()]
     * Filters by function within the collection.
     * @param {(value: V, key: K, collection: this) => boolean} fn
     * @returns {Collection<K,V>}
     * @memberof Collection
     */
    public filter(fn: (value: V, key: K, collection: this) => boolean): Collection<K, V>;
    public filter<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): Collection<K, V>;
    public filter(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): Collection<K, V> {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        const result = new Collection<K, V>();

        for (const [key, value] of this) {

            if (fn(value, key, this))
                result.set(key, value);
        }

        return result;
    }

    /**
     * Like this [Array.some()]
     * Checks if there exists an item that passes a test.
     * @param {(value: V, key: K, collection: this) => boolean} fn
     * @returns {boolean}
     * @memberof Collection
     */
    public some(fn: (value: V, key: K, collection: this) => boolean): boolean;
    public some<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
    public some(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        for (const [key, value] of this) {
            if (fn(value, key, this))
                return true;
        }

        return false;
    }

    /**
     * Like this [Array.every()]
     * Checks if all items passes a test.
     * @param {(value: V, key: K, collection: this) => boolean} fn
     * @returns {boolean}
     * @memberof Collection
     */
    public every(fn: (value: V, key: K, collection: this) => boolean): boolean;
    public every<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
    public every(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): boolean {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        for (const [key, value] of this) {
            if (!fn(value, key, this))
                return false
        }

        return true;
    }

    /**
     *
     * Checks if this collection shares identical items with another.
     * @param {Collection<K, V>} collection
     * @returns {boolean}
     * @memberof Collection
     */
    public equals(collection: Collection<K, V>): boolean {

        for (const [key, value] of collection) {
            if (value === this.get(key) && collection.size === this.size) {
                return true;
            }
        }

        return false;
    }

    /**
     * Like this [Array.concat()]
     * It combines this collection with others in a new collection. None of the source collections are changed.
     * @param {...Collection<K, V>[]} collections
     * @returns {Collection<K,V>}
     * @memberof Collection
     */
    public concat(...collections: Collection<K, V>[]): Collection<K, V> {

        const clone = this.clone();

        for (const collection of collections)
            for (const [key, value] of collection)
                clone.set(key, value);

        return clone;
    }

    /**
     *
     * The difference method returns a new structure containing items where the key is present in one of the original structures but not the other.
     * @param {Collection<K, V>} other
     * @returns {Collection<K,V>}
     * @memberof Collection
     */
    public difference(other: Collection<K, V>): Collection<K, V> {
        const clone = new Collection<K, V>();

        for (const [key, value] of this) {
            if (!other.has(key))
                clone.set(key, value);
        }

        for (const [key, value] of other) {
            if (!this.has(key))
                clone.set(key, value);
        }

        return clone;
    }

    /**
     * Like this [Map.forEach()]
     * Identical to Map.forEach(), but returns the collection instead of undefined.
     * @param {(value: V, key: K, collection: this) => void} fn
     * @returns {this}
     * @memberof Collection
     */
    public each(fn: (value: V, key: K, collection: this) => void): this;
    public each<T>(fn: (this: T, value: V, key: K, collection: this) => void, thisArg: T): this;
    public each(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown): this {
        super.forEach(fn as (this: Map<K, V>, value: V, key: K, collection: Map<K, V>) => boolean, thisArg);
        return this;
    }

    /**
     * Like this [Array.findIndex] but returns the key rather than the positional index.
     * Searches for the key of a single item where the given function returns a truthy value.
     * @param {(value: V, key: K, collection: this) => boolean} fn
     * @returns {(K | undefined)}
     * @memberof Collection
     */
    public findKey(fn: (value: V, key: K, collection: this) => boolean): K | undefined;
    public findKey<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): K | undefined;
    public findKey(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): K | undefined {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        for (const [key, value] of this) {
            if (fn(value, key, this))
                return key;
        }

        return undefined;
    }

    /**
     *
     * Obtains the first value(s) in this collection.
     * @returns {(V | undefined)}
     * @memberof Collection
     */
    public first(): V | undefined;
    public first(amount: number): V[];
    public first(amount?: number): V | V[] | undefined {

        const iter = this.values();

        if (amount === 0 || typeof amount === "undefined") return iter.next().value;

        if (amount < 0) return this.last(amount * -1);

        amount = Math.min(this.size, amount);

        return Array.from({ length: amount }, (): V => iter.next().value);
    }

    /**
     *
     * Obtains the first key(s) in this collection.
     * @returns {(K | undefined)}
     * @memberof Collection
     */
    public firstKey(): K | undefined
    public firstKey(amount: number): K[]
    public firstKey(amount?: number): K | K[] | undefined {

        const iter = this.keys();

        if (amount === 0 || typeof amount === "undefined") return iter.next().value;

        if (amount < 0) return this.lastKey(amount * -1);

        amount = Math.min(this.size, amount);

        return Array.from({ length: amount }, (): K => iter.next().value);
    }

    /**
     *
     * Obtains the last value(s) in this collection.
     * @returns {(V | undefined)}
     * @memberof Collection
     */
    public last(): V | undefined
    public last(amount: number): V[]
    public last(amount?: number): V | V[] | undefined {

        const values = this.array();

        if (amount === 0 || typeof amount === "undefined") return values[this.size - 1];

        if (amount < 0) return this.first(amount * -1);

        amount = Math.min(this.size, amount);

        return values.slice(-amount);
    }

    /**
     *
     * Obtains the last key(s) in this collection.
     * @returns {(K | undefined)}
     * @memberof Collection
     */
    public lastKey(): K | undefined
    public lastKey(amount: number): K[]
    public lastKey(amount?: number): K | K[] | undefined {

        const keys = this.keyArray();

        if (amount === 0 || typeof amount === "undefined") return keys[this.size - 1];

        if (amount < 0) return this.firstKey(amount * -1);

        amount = Math.min(this.size, amount);

        return keys.slice(-amount);
    }


    /**
     *
     * Returns the array of data in this collection.
     * @returns {V[]}
     * @memberof Collection
     */
    public array(): V[] {
        return Array.from(this.values());
    }

    /**
     *
     * Returns the key array in this collection.
     * @returns {K[]}
     * @memberof Collection
     */
    public keyArray(): K[] {
        return Array.from(this.keys());
    }

    /**
     * Like this [Array.flatMap()]
     * Maps each item into a Collection, then joins the results into a single Collection.
     * @template T
     * @param {(value: V, key: K, collection: this) => unknown} fn
     * @returns {Collection<K, T>}
     * @memberof Collection
     */
    public flatMap<T>(fn: (value: V, key: K, collection: this) => unknown): Collection<K, T>;
    public flatMap<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): Collection<K, T>;
    public flatMap<T>(fn: (value: V, key: K, collection: this) => unknown, thisArg?: unknown): Collection<K, T> {

        const resultColl = new Collection<K, T>();

        const result = this.map(fn, thisArg);

        result.forEach((e) => {
            if (e instanceof Collection)
                for (const [k, v] of e) {
                    resultColl.set(k, v)
                }
        });

        return resultColl;
    }

    /**
     *
     * The intersect method returns a new structure containing items where the keys are present in both original structures.
     * @param {Collection<K, V>} other
     * @returns {Collection<K, V>}
     * @memberof Collection
     */
    public intersect(other: Collection<K, V>): Collection<K, V> {
        return other.filter((_, k) => this.has(k));
    }

    /**
     *
     * Maps each item to another value into a collection.
     * @template T
     * @param {(value: V, key: K, collection: this) => T} fn
     * @returns {Collection<K, T>}
     * @memberof Collection
     */
    public mapValues<T>(fn: (value: V, key: K, collection: this) => T): Collection<K, T>;
    public mapValues<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): Collection<K, T>;
    public mapValues<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): Collection<K, T> {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        const result = new Collection<K, T>();

        for (const [key, value] of this) {
            result.set(key, fn(value, key, this));
        }

        return result;
    }

    /**
     *
     * Partitions the collection into two collections where the first collection contains the items that passed and the second contains the items that failed.
     * @param {(value: V, key: K, collection: this) => boolean} fn
     * @returns {Array<Collection<K, V>>}
     * @memberof Collection
     */
    public partition(fn: (value: V, key: K, collection: this) => boolean): Array<Collection<K, V>>;
    public partition<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): Array<Collection<K, V>>;
    public partition(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): Array<Collection<K, V>> {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        const result = [
            new Collection<K, V>(),
            new Collection<K, V>()
        ];

        for (const [key, value] of this) {
            if (fn(value, key, this))
                result[0].set(key, value);
            else
                result[1].set(key, value)
        }

        return result;
    }

    /**
     *
     * Obtains unique random value(s) from this collection.
     * @returns {(V | undefined)}
     * @memberof Collection
     */
    public random(): V | undefined;
    public random(amount: number): V[];
    public random(amount?: number): V | V[] | undefined {
        const values = this.array();

        if (amount === 0 || typeof amount === "undefined") return values[Math.floor(Math.random() * this.size)];

        return Array
            .from({ length: amount }, (): V => values[Math.floor(Math.random() * this.size)]);
    }


    /**
     *
     * Obtains unique random key(s) from this collection.
     * @returns {(V | undefined)}
     * @memberof Collection
     */
    public randomKey(): K | undefined;
    public randomKey(amount: number): K[];
    public randomKey(amount?: number): K | K[] | undefined {
        const keys = this.keyArray();

        if (amount === 0 || typeof amount === "undefined") return keys[Math.floor(Math.random() * this.size)];

        return Array
            .from({ length: amount }, (): K => keys[Math.floor(Math.random() * this.size)]);
    }


    /**
     * Like this [Array.reduce()]
     * Applies a function to produce a single value. 
     * @template T
     * @param {(accumulator: T, value: V, key: K, collection: this) => T} fn
     * @param {T} [initalValue]
     * @returns {T}
     * @memberof Collection
     */
    public reduce<T>(fn: (accumulator: T, value: V, key: K, collection: this) => T, initalValue?: T): T {

        let accumulator!: T;

        if (typeof initalValue !== "undefined") {
            accumulator = initalValue;
            for (const [k, v] of this) {
                accumulator = fn(accumulator, v, k, this);
            }
            return accumulator;
        }

        let first = true;

        for (const [k, v] of this) {
            if (first) {
                accumulator = fn((v as unknown as T), v, k, this);
                first = false;
            } else {
                accumulator = fn(accumulator, v, k, this);
            }
        }

        return accumulator;
    }

    /**
     * Like this [Array.sort()]
     * The sort method sorts the items of a collection in place and returns it.
     * @param {(firstValue: V, secondValue: V, firstKey: K, secondKey: K, collection: this) => number} fn
     * @returns {this}
     * @memberof Collection
     */
    public sort(fn: (firstValue: V, secondValue: V, firstKey: K, secondKey: K, collection: this) => number): this {

        const entries = [...this.entries()];

        entries.sort((a, b) => fn(a[1], b[1], a[0], b[0], this));

        this.clear();

        for (const [k, v] of entries) {
            this.set(k, v);
        }

        return this;
    }

    /**
     *
     * The sorted method sorts the items of a collection and returns it.
     * @param {(firstValue: V, secondValue: V, firstKey: K, secondKey: K, collection: this) => number} fn
     * @returns {Collection<K, V>}
     * @memberof Collection
     */
    public sorted(
        fn: (firstValue: V, secondValue: V, firstKey: K, secondKey: K, collection: this) => number
    ): Collection<K, V> {
        return (this.clone() as this).sort(fn);
    }

    /**
     *
     * Removes items that satisfy the provided filter function.
     * @param {(value: V, key: K, collection: this) => boolean} fn
     * @returns {number}
     * @memberof Collection
     */
    public sweep(fn: (value: V, key: K, collection: this) => boolean): number;
    public sweep<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): number;
    public sweep(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): number {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        let total = 0;

        for (const [key, value] of this) {
            if (fn(value, key, this)) {
                this.delete(key);
                total++;
            }
        }

        return total;
    }

    /**
     *
     * Runs a function on the collection and returns the collection.
     * @param {(collection: this) => void} fn
     * @returns {this}
     * @memberof Collection
     */
    public tap(fn: (collection: this) => void): this;
    public tap<T>(fn: (this: T, collection: this) => void, thisArg: T): this;
    public tap(fn: (collection: this) => void, thisArg?: unknown): this {

        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);

        fn(this);

        return this;
    }



    /**
     *
     * Clones this collection.
     * @returns {this}
     * @memberof Collection
     */
    public clone(): Collection<K, V> {
        return new Collection<K, V>(this);
    }
}


export default Collection;
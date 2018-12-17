/*
Create a Hash map called lor and add the following items to it. {Hobbit:"Bilbo"}, {Hobbit:"Frodo"}, {Wizard:"Gandolf"}, {Human:"Aragon"}, {Elf: "Legolas"}, {Maiar:"The Necromancer"}, {Maiar: "Sauron"}, {RingBearer: "Gollum"}, {LadyOfLight: "Galadriel"}, {HalfElven: "Arwen"}, {Ent: "Treebeard"}
Retrieve the value that is hashed in the key Maiar
*/
//methods get, remove

class HashMap {
  constructor(initialCapacity = 10) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if(this._slots[index] === undefined) {
      throw new Error('Key Error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this.deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value
    };
    this.length++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key == key) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if(slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

let lor = new HashMap();
lor.set('Hobbit', "Bilbo");
lor.set('Hobbit', "Frodo");
lor.set('Wizard', "Gandolf");
lor.set('Human', "Aragon");
lor.set('Maiar', "The Necromancer");
lor.set('Maiar', "Sauron");
lor.set('RingBearer', "Gollum");
lor.set('LadyOfLight', "Galadriel");
lor.set('HalfElven', "Arwen");
lor.set('Ent', "Treebeard");
console.log(lor.get('Maiar'));
console.log(lor);
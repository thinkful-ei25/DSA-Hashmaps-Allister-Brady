const HashMap = require('./hashmap');

function createHashMapClass() {
  let lor = new HashMap();
  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');
  console.log(lor.get('Maiar'));
  console.log(lor);
  console.log(lor._findSlot('Hobbi'));
}
/*
1. Check length of the string input if it's 1 or 0 then return false.
2. Create a char hashmap
3. Create a loop to run over each char in the str and place the letter as the key in the char hashmap
4. If the key already exists then set its value to +1, if not, then add it as a key and set value to 1
5. After it's been mapped, if the length of the str input is odd 
6. If it's length is odd then check to make sure only 1 key has an odd value.
  - If that's true, then check to make sure that the rest of the keys have a even value.
7. If not odd, then check to make sure that no keys have an odd value.
8. Else return false.
*/
function palindrome(str) {
  // Check length of the string input if it's 1 or 0 then return false.
  const strLength = str.length;
  if (strLength < 2) {
    return false;
  }
  // Create a char hashmap
  // Create a loop to run over each char in the str and place the letter as the key in the char hashmap
  // If the key already exists then set its value to + 1, if not, then add it as a key and set value to 1
  let chars = new HashMap();
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    try {
      let charValue = chars.get(char);
      chars.set(char, ++charValue);
    } catch (error) {
      chars.set(char, 1);
    }
  }
  let odds = 0;
  for (let j = 0; j < chars.length && odds <= 1; j++) {
    let value = chars._slots[j] ? chars._slots[j].value : 0;
    odds += value % 2;
  }
  return odds <= 1;
}

function anagramGroup(array) {
  let anagrams = new HashMap();
  for (let word of array) {
    let sortedWord = word
      .toLowerCase()
      .split('')
      .sort()
      .join('');
    console.log(sortedWord);
    try {
      let arr = anagrams.get(sortedWord);
      anagrams.set(sortedWord, [...arr, word]);
    } catch {
      anagrams.set(sortedWord, [word]);
    }
  }
  let anagramsArray = [];
  for (let words of anagrams._slots) {
    if (words) {
      anagramsArray.push(words.value);
    }
  }
  return anagramsArray;
}

console.log(
  anagramGroup(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])
);

// input: ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
// output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

//1. create hashmap
//2. loop through input array
//3. sort each word alphabetically
//4. if the sorted word is not in the hashmap, create a hashmap key with that word and add the unsorted word to the value array
//5. if the sorted word is in the hashmap, add the unsorted word to the value array at that key
//6. loop through the keys in the hashmap and add the values to the output array
//7. return the output array

console.log(palindrome('madam'));

createHashMapClass();

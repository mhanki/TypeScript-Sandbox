import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([10, 6, -5, 0]);
const numbersSorter = new Sorter(numbersCollection);

numbersSorter.sort();
console.log(numbersCollection.data);

const charactersCollection = new CharactersCollection("akloGbnmseu")
const charactersSorter = new Sorter(charactersCollection)

charactersSorter.sort();
console.log(charactersCollection.data);

const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);

const linkedListSorter = new Sorter(linkedList);

linkedListSorter.sort();
linkedList.print();
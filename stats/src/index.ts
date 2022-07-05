import { CsvFileReader } from './composition/CsvFileReader';
import { MatchReader } from "./composition/MatchReader";

const fileReader = new CsvFileReader('football.csv');
const matchReader = new MatchReader(fileReader);

matchReader.load();
console.log(matchReader.matches[0])
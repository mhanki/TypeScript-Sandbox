import { MatchReader } from "./composition/MatchReader";
import { Summary } from './Summary';
/* import { CsvFileReader } from './composition/CsvFileReader';
import { ConsoleReport } from './reporter/ConsoleReport';
import { WinsAnalysis } from './analyzer/WinsAnalysis'; */

/* const fileReader = new CsvFileReader('football.csv');

const matchReader = new MatchReader(fileReader);
matchReader.load();

const winsSummary = new Summary(
  new WinsAnalysis('Man United'),
  new ConsoleReport()
);
winsSummary.buildAndPrintReport(matchReader.matches) */

const matchReader = MatchReader.fromCsv('football.csv');
matchReader.load();

const summary = Summary.winsAnalysisWithHtmlReport('Man United');
summary.buildAndPrintReport(matchReader.matches)
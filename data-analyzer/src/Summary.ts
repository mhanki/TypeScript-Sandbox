import { MatchData } from './MatchData';
import { WinsAnalysis } from './analyzer/WinsAnalysis';
import { HtmlReport } from './reporter/HtmlReport';

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) { }

  static winsAnalysisWithHtmlReport(team: string): Summary {
    return new Summary(
      new WinsAnalysis(team),
      new HtmlReport()
    )
  }

  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}
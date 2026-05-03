export interface SlideData {
  id: number;
  section: string;
  title: string;
  bullets: string[];
  story: string;
  interactivity: {
    type: string;
    prompt?: string;
    label?: string;
    action?: string;
    question?: string;
    options?: string[];
    feedback?: string;
    before?: string;
    after?: string;
    steps?: string[];
    range?: [number, number];
    images?: string[];
    items?: string[];
  };
  activity: string;
  enterpriseInsight: string;
  math?: {
    equation: string;
    interpretations: {
      term: string;
      meaning: string;
    }[];
  };
  caseStudy?: {
    background: string;
    technicalRisk: string;
    mitigation: string;
    experimentSetup: string;
    insight: string;
  };
}

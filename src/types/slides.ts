export interface SlideData {
  id: number;
  section: string;
  title: string;
  bullets: string[];
  story: string;
  interactivity: {
    type: string;
    prompt?: string;
    action?: string;
    question?: string;
    options?: string[];
    answer?: string;
    range?: [number, number];
    label?: string;
    nodes?: string[];
    steps?: string[];
    pairs?: string[];
    left?: string;
    right?: string;
    before?: string;
    after?: string;
    task?: string;
    images?: string[];
    categories?: string[];
    items?: string[];
    questions?: number;
  };
  activity: string;
  enterpriseInsight: string;
}

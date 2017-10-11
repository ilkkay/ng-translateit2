  export class Source {
    plural: string;
    text: string;
    skeletonTag: string
  };

  export class Target {
    equivalent: boolean;
    plural: string;
    text: string;
    comment: any;
    history: any;
    note: any;
    state: any;
    skeletonTag: string
  };

  export class Unit {
  id: number;
  segmentKey: string;
  serialNumber: number;
  workId: number;
  source: Source;
  target: Target;
}

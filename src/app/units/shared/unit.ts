export class Unit {

  id: number;
  segmentKey: string;
  serialNumber: number;
  workId: number;

  source: {
    plural: string;
    text: string;
    skeletonTag: string
  };

  target: {
    equivalent: boolean;
    plural: string;
    text: string;
    comment: any;
    history: any;
    note: any;
    state: any;
    skeletonTag: string
  };

  // ,"$$hashKey":"object:26"},
}

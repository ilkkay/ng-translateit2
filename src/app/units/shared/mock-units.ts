import { Unit } from './unit';

export const UNITS: Unit [] = [ {
  id: 1,
  segmentKey: 'alert-file-too-large-takes-lot-of-time',
  serialNumber: 1,
  workId: 1,
  source: {
    plural: null,
    text: 'Saving the file may take a longer time because of its size',
    skeletonTag: null
  },
  target: {
    equivalent: false,
    plural: null,
    text: '',
    comment: null,
    history: null,
    note: null,
    state: 'NEEDS_TRANSLATION',
    skeletonTag: 'TARGET_TAG_1',
  }
},
{
  id: 2,
  segmentKey: 'a-new-password-can-only-be-sent-to-an-external-email-address',
  serialNumber: 2,
  workId: 1,
  source: {
    plural: null,
    text: 'A new password can only be sent to an external email address.',
    skeletonTag: null
  },
  target: {
    equivalent: false,
    plural: null,
    text: 'Uusi salasana voidaan lähettää vain ulkoiseen sähköpostiosoitteeseen',
    comment: null,
    history: null,
    note: null,
    state: 'TRANSLATED',
    skeletonTag: 'TARGET_TAG_2',
  }
}
];

export enum ReceptionTableEnum {
  ALL = 'all',
  PERIODONTICS = '4',
  THERAPY = '5',
  SURGERY = '6',
  ORTHOPEDICS = '7',
  OTHER = '1',
}

export const ReversedReceptionTableEnum: { [key: string]: string } = {
  '1': 'OTHER',
  '4': 'PERIODONTICS',
  '5': 'Терапия',
  '6': 'SURGERY',
  '7': 'ORTHOPEDICS',
};
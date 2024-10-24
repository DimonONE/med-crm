export interface Template {
  id?: number
  name: string
  positionId: number
  subTemplateId: number
  lineBlocks: TemplateLineBlock[]
}

export interface TemplateLineBlock {
  id?: number
  positionId: number
  bodyBlockId: number
  blockInfo: TemplateBlockInfo[]
}

export interface TemplateBlockInfo {
  id?: number
  lineId: number
  sizeX: number
  sizeY: number
  positionId: number
  space: number
  status: TemplateStatus
  value: string
}

export interface UpdateCurrentBlock extends TemplateBlockInfo {
  value: string
  checked: boolean
}

export type TemplateStatus = 'TEXT' | 'BOLD_TEXT' | 'DROPDOWN' | 'CHECK_BOX' | 'RADIO_BOX' | 'DATE' | 'EMPTY' | 'POINT_TEXT' | 'WRITE_TEXT' | 'default';


export type TreatmentParamsType = {
  patientId: string,
  doctorId: string,
  status?: string,
  category?: string,
};
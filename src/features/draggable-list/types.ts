export interface Template {
  id: number
  name: string
  positionId: number
  subTemplateId: number
  lineBlocks: TemplateLineBlock[]
}

export interface TemplateLineBlock {
  id: number
  positionId: number
  bodyBlockId: number
  blockInfo: TemplateBlockInfo[]
}

export interface TemplateBlockInfo {
  id: number
  lineId: number
  sizeX: number
  sizeY: number
  positionId: number
  space: number
  status: TemplateStatus
}

export type TemplateStatus = 'text' | 'bold' | 'dropdown' | 'checkBox' | 'radioButton' | 'date' | 'empty' | 'list' | 'handwritten' | 'default';

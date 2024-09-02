// @ts-nocheck
import { create } from 'zustand';
import { Template, TemplateLineBlock, TemplateStatus } from '../types';


type DraggableSlice = {
  templates: Template[];

  currentBlockInfo: {
    templateId: number
    bodyBlockId: number
    lineId: number
  } | null

  handleTemplates: (templates: Template[]) => void;
  handleTemplatesTitle: (id: number, name: string) => void;
  updateTemplatesLine: (templateId: number, lineBlocks: TemplateLineBlock[]) => void;
  onCurrentBlockInfo: (templateId: number, bodyBlockId: number, lineId: number) => void
  addCurrentBlock: (status: TemplateStatus) => void

  toggleVisibility: boolean;
  selectTemplateItem: string;
  onToggleVisibility: (toggleVisibility: boolean) => void;
  addTemplatesLine: (templateId: number) => void;
};

const updateTemplate = (set, templateId: number, updateFn: (template: Template) => Template) => {
  set((state) => ({
    templates: state.templates.map((template) =>
      template.id === templateId ? updateFn(template) : template,
    ),
  }));
};

export const useDraggableSlice = create<DraggableSlice>((set, get) => ({
  toggleVisibility: false,
  selectTemplateItem: '',
  templates: [{
    id: 1,
    name: '',
    positionId: 0,
    subTemplateId: 0,
    lineBlocks: [
      {
        'id': 0,
        'positionId': 0,
        'bodyBlockId': 0,
        'blockInfo': [],
      },
    ],
  }],

  handleTemplatesTitle: (id: number, name: string) => {
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id
          ? { ...template, name }
          : template,
      ),
    }));
  },

  addTemplatesLine: (templateId: number) => {
    updateTemplate(set, templateId, (template) => {
      const createId = template.lineBlocks.length;

      const newLineBlock = {
        id: createId,
        positionId: createId,
        bodyBlockId: createId,
        blockInfo: [],
      };

      return {
        ...template,
        lineBlocks: [...template.lineBlocks, newLineBlock],
      };
    });
  },

  updateTemplatesLine: (templateId: number, lineBlocks: TemplateLineBlock[]) => {
    updateTemplate(set, templateId, (template) => ({
      ...template,
      lineBlocks,
    }));
  },

  onToggleVisibility: (toggleVisibility: boolean) => {
    set({
      toggleVisibility,
      currentBlockInfo: null,
    });
  },

  handleTemplates: (templates: Template[]) => {
    set({ templates });
  },

  onCurrentBlockInfo: (templateId: number, bodyBlockId: number, lineId: number) => {
    set({
      currentBlockInfo: {
        templateId,
        bodyBlockId,
        lineId,
      },
    });
  },

  addCurrentBlock: (status: TemplateStatus) => {
    const { currentBlockInfo } = get();

    if (!currentBlockInfo) {
      return;
    }

    const { templateId, bodyBlockId, lineId } = currentBlockInfo;

    updateTemplate(set, templateId, (template) => ({
      ...template,
      lineBlocks: template.lineBlocks.map((lineBlock) => {
        if (lineBlock.bodyBlockId === bodyBlockId) {
          if (lineBlock.blockInfo.length === 0) {
            return {
              ...lineBlock,
              blockInfo: [
                {
                  id: 0,
                  lineId: 0,
                  positionId: 0,
                  sizeX: 0,
                  sizeY: 0,
                  space: 0,
                  status,
                },
                {
                  id: 1,
                  lineId: 1,
                  positionId: 1,
                  sizeX: 0,
                  sizeY: 0,
                  space: 0,
                  status: 'default',
                },
              ],
            };
          }

          const defaultId = lineBlock.blockInfo.length + 2;
          return {
            ...lineBlock,
            blockInfo: [...lineBlock.blockInfo.map((info) => {
              if (info.lineId === lineId) {
                const createId = lineBlock.blockInfo.length + 1;

                return {
                  id: createId,
                  lineId: createId,
                  positionId: createId,
                  sizeX: 0,
                  sizeY: 0,
                  space: 0,
                  status,
                };
              }
              return info;
            }),
            {
              id: defaultId,
              lineId: defaultId,
              positionId: defaultId,
              sizeX: 0,
              sizeY: 0,
              space: 0,
              status: 'default',
            },
            ],
          };
        }
        return lineBlock;
      }),
    }));

    set({
      toggleVisibility: false,
      currentBlockInfo: null,
    });
  },
}));

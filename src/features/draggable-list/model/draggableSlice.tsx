import { create } from 'zustand';
import { Template, TemplateLineBlock, TemplateStatus, TemplateBlockInfo, UpdateCurrentBlock } from '../types';


type DraggableSlice = {
  templates: Template[];

  currentBlockInfo: {
    subTemplateId: number
    bodyBlockId: number
    lineId: number
  } | null

  handleTemplates: (templates: Template[]) => void;
  handleTemplatesTitle: (subTemplateId: number, name: string) => void;
  updateTemplatesLine: (subTemplateId: number, lineBlocks: TemplateLineBlock[]) => void;
  updateTemplatesLineItem: (subTemplateId: number, bodyBlockId: number, lineId: number) => void;
  onCurrentBlockInfo: (subTemplateId: number, bodyBlockId: number, lineId: number) => void
  addCurrentBlock: (status: TemplateStatus) => void
  updateCurrentBlock: (subTemplateId: number, bodyBlockId: number, lineId: number, updateParams: Partial<UpdateCurrentBlock>) => void;
  toggleVisibility: boolean;
  selectTemplateItem: string;
  onToggleVisibility: (toggleVisibility: boolean) => void;
  addTemplatesLine: (subTemplateId: number) => void;
};

const updateTemplate = (set: any, subTemplateId: number, updateFn: (template: Template) => Template) => {
  set((state: DraggableSlice) => ({
    templates: state.templates.map((template) =>
      template.subTemplateId === subTemplateId ? updateFn(template) : template,
    ),
  }));
};

export const useDraggableSlice = create<DraggableSlice>((set, get) => ({
  toggleVisibility: false,
  selectTemplateItem: '',
  currentBlockInfo: null,
  templates: [{
    name: '',
    positionId: 0,
    subTemplateId: 0,
    lineBlocks: [
      {
        positionId: 0,
        bodyBlockId: 0,
        blockInfo: [],
      },
    ],
  }],

  handleTemplatesTitle: (subTemplateId: number, name: string) => {
    set((state) => ({
      templates: state.templates.map((template) =>
        template.subTemplateId === subTemplateId
          ? { ...template, name }
          : template,
      ),
    }));
  },

  addTemplatesLine: (subTemplateId: number) => {
    updateTemplate(set, subTemplateId, (template) => {
      const createId = template.lineBlocks.length;

      const newLineBlock = {
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

  updateTemplatesLine: (subTemplateId: number, lineBlocks: TemplateLineBlock[]) => {
    updateTemplate(set, subTemplateId, (template) => ({
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

  onCurrentBlockInfo: (subTemplateId: number, bodyBlockId: number, lineId: number) => {
    set({
      currentBlockInfo: {
        subTemplateId,
        bodyBlockId,
        lineId,
      },
    });
  },

  updateTemplatesLineItem: (subTemplateId: number, bodyBlockId: number, lineId: number) => {
    const { templates } = get();

    const updatedTemplates = templates.map(template => {
      if (template.subTemplateId !== subTemplateId) return template;

      const updatedLineBlocks = template.lineBlocks.map(lineBlock => {
        if (lineBlock.bodyBlockId !== bodyBlockId) return lineBlock;

        const updatedBlockInfo = lineBlock.blockInfo.filter(({ lineId: id }) => id !== lineId);

        return { ...lineBlock, blockInfo: updatedBlockInfo };
      });

      return { ...template, lineBlocks: updatedLineBlocks };
    });

    set({ templates: updatedTemplates });
  },

  addCurrentBlock: (status: TemplateStatus) => {
    const { currentBlockInfo } = get();

    if (!currentBlockInfo) {
      return;
    }

    const { subTemplateId, bodyBlockId, lineId } = currentBlockInfo;

    updateTemplate(set, subTemplateId, (template) => ({
      ...template,
      lineBlocks: template.lineBlocks.map((lineBlock) => {
        if (lineBlock.bodyBlockId === bodyBlockId) {
          if (lineBlock.blockInfo.length === 0) {
            return {
              ...lineBlock,
              blockInfo: [
                {
                  lineId: 0,
                  positionId: 0,
                  sizeX: 0,
                  sizeY: 0,
                  space: 0,
                  status,
                },
                {
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

  updateCurrentBlock: (subTemplateId: number, bodyBlockId: number, lineId: number, updateParams: Partial<TemplateBlockInfo>) => {
    const { templates } = get();
    console.log('templates', templates);
    console.log('updateParams', updateParams);

    const updatedTemplates = templates.map(template => {
      if (template.subTemplateId !== subTemplateId) return template;

      const updatedLineBlocks = template.lineBlocks.map(lineBlock => {
        if (lineBlock.bodyBlockId !== bodyBlockId) return lineBlock;

        const updatedBlockInfo = lineBlock.blockInfo.map((blockInfo) => {
          if (blockInfo.lineId === lineId) {
            return {
              ...blockInfo,
              ...updateParams,
            };
          }

          return blockInfo;
        });

        return { ...lineBlock, blockInfo: updatedBlockInfo };
      });

      return { ...template, lineBlocks: updatedLineBlocks };
    });
    console.log('templates', updatedTemplates);

    set({ templates: updatedTemplates });
  },
}));

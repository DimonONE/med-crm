import { create } from 'zustand';
import { ContentT, LineContentT, Template } from '../types';

type DraggableSlice = {
  toggleVisibility: boolean;
  selectTemplateItem: string;
  templates: Template[];
  handleTemplates: (templates: Template[]) => void;
  handleTemplatesContent: (templateId: string, templates: ContentT[]) => void;
  onToggleVisibility: (toggleVisibility: boolean) => void;
  addTemplatesBlock: () => void;
  addTemplatesLine: (templateId: string) => void;
  updateLineContent: (
    templateId: string,
    contentId: string,
    newLineContent: LineContentT[],
  ) => void;
};

export const useDraggableSlice = create<DraggableSlice>((set, get) => ({
  toggleVisibility: false,
  selectTemplateItem: '',
  templates: [],

  onToggleVisibility: (toggleVisibility: boolean) => {
    set({ toggleVisibility });
  },

  onSelectTemplateId: (templateId: string) => {
    set({ selectTemplateItem: templateId });
  },

  handleTemplates: (templates: Template[]) => {
    set({ templates });
  },

  handleTemplatesContent: (templateId: string, content: ContentT[]) => {
    const updatedTemplates = get().templates.map((template) => {
      if (template.id === templateId) {
        return {
          ...template,
          content,
        };
      }
      return template;
    });

    set({ templates: updatedTemplates });
  },

  addTemplatesBlock: () => {
    const addLineTemplate = [
      ...get().templates,
      {
        id: (get().templates.length + 1).toString(),
        content: [],
      },
    ];
    set({ templates: addLineTemplate });
  },

  addTemplatesLine: (templateId: string) => {
    const addLineTemplate = get().templates.map((template) => {
      if (template.id === templateId) {
        return {
          ...template,
          content: [
            ...template.content,
            {
              id: (template.content.length + 1).toString(),
              lineContent: [
                {
                  id: '1',
                  template: `test-${(template.content.length + 1).toString()}`,
                },
              ],
            },
          ],
        };
      }
      return template;
    });

    set({ templates: addLineTemplate });
  },

  updateLineContent: (templateId, contentId, newLineContent) => {
    const updatedTemplates = get().templates.map((template) => {
      if (template.id === templateId) {
        return {
          ...template,
          content: template.content.map((contentItem) => {
            if (contentItem.id === contentId) {
              return {
                ...contentItem,
                lineContent: newLineContent,
              };
            }
            return contentItem;
          }),
        };
      }
      return template;
    });

    set({ templates: updatedTemplates });
  },
}));

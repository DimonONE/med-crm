import { ReactNode } from 'react';

export interface LineContentT {
  id: string | number;
  template: ReactNode;
}

export interface ContentT {
  id: string;
  lineContent: LineContentT[];
}

export interface Template {
  id: string;
  content: ContentT[];
}

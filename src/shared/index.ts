export enum TemplateState {
  Install = 1,
  NotInstall = 2,
  Unknown = 3
}
export enum Language {
  All = "All",
  CSS = "CSS",
  JavaScript = "JavaScript"
}
// ONLINE
export const ONLINE_BASE_URL =
  "https://cdn.jsdelivr.net/gh/sillyY/template-library";

export interface ITreeNode {
  id: string;
  name: string;
  category: string;
  description: string;
  state: TemplateState;
  language: string;
  extname: string;
}

export const defaultTreeNode: ITreeNode = {
  id: "",
  name: "",
  category: "",
  description: "",
  state: TemplateState.Install,
  language: "",
  extname: ""
};

// LOCAL
export interface ILocalTreeNode {
  name: string;
  extname: string;
}

export const defaultLocalTreeNode: ILocalTreeNode = {
  name: "",
  extname: ""
};

// MINE
export interface IMineTreeNode {
  name: string;
  extname: string;
  path: string;
}

export const defaultMineTreeNode: IMineTreeNode = {
  name: "",
  extname: "",
  path: ""
};

export interface IMineConfig {
  name: string;
  path: string;
}

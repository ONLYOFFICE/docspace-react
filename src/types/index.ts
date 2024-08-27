/*
* (c) Copyright Ascensio System SIA 2024
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

export type TFrameType = "desktop" | "mobile";

export type TFrameMode =
  | "manager"
  | "editor"
  | "viewer"
  | "room-selector"
  | "file-selector"
  | "system";

export type TSelectorType =
  | "roomsOnly"
  | "userFolderOnly"
  | "exceptPrivacyTrashArchiveFolders"
  | "exceptSortedByTagsFolders";

export type TEditorType = "desktop" | "embedded";

export type TViewAs = "row" | "table" | "tile";

export type TTheme = "Base" | "Dark" | "System";

export type TFilterSortOrder = "descending" | "ascending";

export type TFilterSortBy =
  | "DateAndTime"
  | "AZ"
  | "Type"
  | "Size"
  | "DateAndTimeCreation"
  | "Author";

export type TEditorCustomization = {
  anonymous: {
    request: boolean;
    label: string;
  };
  autosave: boolean;
  comments: boolean;
  compactHeader: boolean;
  compactToolbar: boolean;
  compatibleFeatures: boolean;
  forcesave: boolean;
  help: boolean;
  hideRightMenu: boolean;
  hideRulers: boolean;
  integrationMode: string;
  macros: boolean;
  macrosMode: string;
  mentionShare: boolean;
  mobileForceView: boolean;
  plugins: boolean;
  toolbarHideFileName: boolean;
  toolbarNoTabs: boolean;
  uiTheme: string;
  unit: string;
  zoom: number;
};

export type TFrameFilter = {
  count: number;
  folder?: string | number;
  page: number;
  search: string;
  sortby: TFilterSortBy;
  sortorder: TFilterSortOrder;
  withSubfolders?: boolean;
};

export type TFrameEvents = {
  onAppError: null | ((e: Event | string) => void);
  onAppReady: null | ((e: Event) => void);
  onNoAccess: null | ((e: Event) => void);
  onContentReady: null | ((e: Event) => void);
  onAuthSuccess: null | ((e: Event) => void);
  onCloseCallback: null | ((e: Event) => void);
  onDownload: null | ((e: Event | string) => void);
  onEditorCloseCallback: null | ((e: Event) => void);
  onSelectCallback: null | ((e: Event) => void);
  onSignOut: null | ((e: Event) => void);
};

export type TFrameConfig = {
  buttonColor: string;
  checkCSP: boolean;
  destroyText: string;
  disableActionButton: boolean;
  downloadToEvent: boolean;
  editorCustomization: TEditorCustomization | object;
  editorGoBack: boolean | string;
  editorType: TEditorType;
  events: TFrameEvents;
  filter: TFrameFilter;
  filterParam: string;
  frameId: string;
  height: string;
  id: string | number | null;
  infoPanelVisible: boolean;
  init?: boolean | null;
  keysForReload: string[];
  locale: string | null;
  mode: TFrameMode;
  name: string;
  requestToken: string | null;
  rootPath: string;
  selectorType: TSelectorType;
  showFilter: boolean;
  showHeader: boolean;
  showMenu: boolean;
  showSelectorCancel: boolean;
  showSelectorHeader: boolean;
  showSettings: boolean;
  showSignOut: boolean;
  showTitle: boolean;
  src: string;
  theme: TTheme;
  type: TFrameType;
  viewAs: TViewAs;
  viewTableColumns: string;
  waiting: boolean;
  width: string;
  withBreadCrumbs: boolean;
  withSearch: boolean;
  withSubtitle: boolean;
};

export type TMessageData = {
  type: string;
  frameId: string;
  methodReturnData: object;
  eventReturnData: TEventReturnData;
  commandName: string;
  commandData: any;
};

export type TEventReturnData = {
  event: string;
  data: any;
}

export type TTask = {
  type: string,
  methodName: string,
  data: any,
}
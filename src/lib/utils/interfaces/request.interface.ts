import type { Headers, QueryParams } from "../dto";
import type { AuthSection } from "../enums/authorization.enum";
import type { ItemType } from "../enums/item-type.enum";
import type {
  RequestAuthTypes,
  RequestDatasetType,
  RequestMethodType,
  RequestRawType,
  RequestSectionType,
} from "../types/request.type";

export interface Path {
  workspaceId: string;
  collectionId: string;
  folderId?: string;
  folderName?: string;
}

export interface Response {
  headers: unknown;
  status: string;
  body: string;
  time: number;
  size: number;
}

export interface RequestBody {
  method: string;
  url?: string;
  body?: string;
  headers?: Headers[];
  queryParams?: QueryParams[];
}

export interface KeyValuePair {
  key: string;
  value: string;
  checked: boolean;
}

export interface KeyValuePairWithBase {
  key: string;
  value: string;
  checked: boolean;
  base: string | ArrayBuffer;
}

export interface FormData {
  key: string;
  value: string;
  checked: boolean;
}

export interface Body {
  raw?: string;
  urlencoded?: KeyValuePair[];
  formdata?: {
    text: KeyValuePair[];
    file: KeyValuePairWithBase[];
  };
}

export interface State {
  raw?: RequestRawType;
  dataset?: RequestDatasetType;
  auth?: RequestAuthTypes;
  section?: RequestSectionType;
}

export interface BasicAuth {
  username?: string;
  password?: string;
}

export interface ApiKey {
  authKey: string;
  authValue: string;
  addTo: AuthSection.HEADER | AuthSection.QUERY_PARAMETER;
}

export interface Auth {
  bearerToken?: string;
  basicAuth?: BasicAuth;
  apiKey?: ApiKey;
}

export interface Request {
  method: RequestMethodType;
  body?: Body;
  url?: string;
  headers?: KeyValuePair[];
  queryParams?: KeyValuePair[];
  autoGeneratedHeaders?: KeyValuePair[];
  response?: Response;
  state?: State;
  auth?: Auth;
}

export interface NewTab {
  id: string;
  name: string;
  type: ItemType.COLLECTION | ItemType.FOLDER | ItemType.REQUEST;
  request?: Request;
  save: boolean;
  requestInProgress: boolean;
  path?: Path;
}

export interface CurrentTab {
  id: string | null;
}

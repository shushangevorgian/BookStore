export interface IGeneralStateData {
  error: string;
  loading: boolean;
  data?: IDataType[];
  single?: IDataType;
  isSuccess?: boolean;
  id?: number;
}

export interface IDataType {
  id: number;
  price: string;
  title: string;
  image: string;
  discount:string;
  body: string;
}

export interface IGeneralStateDataAdding {
  id?: number;
  title: string;
  prices: string;
  body: string;
  discount: string;
  fileUploaded: File;
  callback: () => unknown;
}

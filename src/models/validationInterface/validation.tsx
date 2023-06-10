export interface IValidationSchemeValues {
  title: string;
  body: string;
  prices: string;
  discount: string;
  image: string;
}

interface IGeneralStateDataAdding {
  title: string;
  prices: string;
  body: string;
  discount: string;
  id: number;
  fileUploaded: File;
  callback: () => unknown;
}


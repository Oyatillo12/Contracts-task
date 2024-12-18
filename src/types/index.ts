export type LoginType = {
  login?: string;
  password?: string;
};

export interface AttachmentType {
  size: number;
  url: string;
  origName?: string;
}

export interface ContractType {
  id?: number
  title: string;
  createdAt?: string
  courseId: number;
  attachment?: AttachmentType;
  course?: CourseType;
}

export interface GetContractsParamsType {
  page?: number;
  perPage?: number;
  search?: string;
};

export interface CourseType {
  id: number;
  name: string;
  createdAt?: string;
  disciplineId?: number;
  disciplineName?: string;
  hasCurriculum?: boolean;
  hasStudyMonths?: boolean;
  imageIllustration?: string;
}

export interface responseData {
  contracts: ContractType[];
  total: number;
}

export interface CreateContractsType {
  title: string;
  courseId: number;
  attachment: FileList;
}

export interface ResponseDataType {
  total: number;
  contracts: ContractType[];
}

export interface PaginationType {
  current: number;
  pageSize: number;
}

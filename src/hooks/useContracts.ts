import { useAxios } from "./useAxios";
import { ContractType, GetContractsParamsType } from "../types";

export const useGetContracts = async (params?: GetContractsParamsType) => {
  const res = await useAxios(true).get("/contracts/all", {
    params: params,
  });
  return res.data;
};

export const useGetCourses = async (params?: GetContractsParamsType) => {
  const res = await useAxios().get("/courses", {
    params: params,
  });
  return res.data.data.courses;
};

export const useCreateContracts = async (contract: ContractType) => {
  const res = await useAxios().post("/contracts/create", contract);
  return res.data;
};

export const useUploadFileAttachment = async (file: File) => {
  const res = await useAxios().post(
    "/upload/contract/attachment",
    {
      files: file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};


export const useEditContracts = async (id: number, contract: ContractType) => {
  const res = await useAxios().put(`/contracts/${id}`, contract);
  return res.data;
}
import { makeAutoObservable } from "mobx";
import { ContractType, CourseType, PaginationType, ResponseDataType } from "../types";
import { useCreateContracts, useEditContracts, useGetContracts, useGetCourses, useUploadFileAttachment } from "../hooks/useContracts";
import Notification from "../utils/Notification";
import axios, { AxiosError } from "axios";

export class ContractsStore {
  data: ResponseDataType = {
    contracts: [],
    total: 0,
  };
  pagination: PaginationType = {
    current: 1,
    pageSize: 10,
  };
  courses: CourseType[] = [];
  editData: ContractType | null = null;
  searchValue: string = "";
  loading: boolean = false;
  openModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getContracts(search?: string) {
    try {
      this.setLoading(true);
      const res = await useGetContracts({
        page: this.pagination.current,
        perPage: this.pagination.pageSize,
        search: search,
      });
      this.setData(res.data);
    } catch {
      console.error("Error fetching contracts");
    } finally {
      this.setLoading(false);
    }
  }

  async getCourses() {
    try {
      const courses = await useGetCourses();
      this.setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      this.setLoading(false);
    }
  }

  async uploadFile(file: File) {
    try {
      const res = await useUploadFileAttachment(file);
      if (res.success) {
        return {
          size: res.data[0].size,
          origName: res.data[0].fileName,
          url: res.data[0].path,
        };
      } else {
        Notification("error", "Fayl yuklashda xatolik");
        return null;
      }
    } catch (error) {
      Notification("error", "Fayl yuklashda xatolik");
      return null;
    }
  }

  async addOrEditContract(contractData: ContractType, contractId?: number){
    try {
      let res;
      if (contractId) {
        res = await useEditContracts(contractId, contractData);
      } else {
        res = await useCreateContracts(contractData);
      }

      if (res.success) {
        this.getContracts();
        Notification("success", contractId ? "Shartnoma yangilandi" : "Shartnoma qo'shildi");
      }
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data.error.errId == 165) {
        Notification("error", "Shartnoma mavjud");
        return;
      }
      Notification("error", "Xatolik yuz berdi");
    }
  }

  setData(data: ResponseDataType) {
    this.data = data;
  }

  setPagination(pagination: PaginationType) {
    this.pagination = pagination;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setSearchValue(searchValue: string) {
    this.searchValue = searchValue;
  }

  setEditData(editData: ContractType | null) {
    this.editData = editData;
  }

  setOpenModal(openModal: boolean) {
    this.openModal = openModal;
  }

  setCourses(courses: CourseType[]) {
    this.courses = courses;
  }

}

const store = new ContractsStore();
export default store;

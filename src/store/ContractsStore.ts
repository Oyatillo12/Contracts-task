import { makeAutoObservable } from "mobx";
import { ContractType } from "../types";

export class ContractsStore {
  contracts: ContractType[] = [];
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
  };
  loading: boolean = false;
  searchValue: string = "";
  refresh: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setContracts(contracts: ContractType[]) {
    this.contracts = contracts;
  }
  setPagination(pagination: {
    current: number;
    pageSize: number;
    total: number;
  }) {
    this.pagination = pagination;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setSearchValue(searchValue: string) {
    this.searchValue = searchValue;
  }

  setRefresh(refresh: boolean) {
    this.refresh = refresh;
  }
}

const store = new ContractsStore();
export default store;

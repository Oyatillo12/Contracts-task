import { useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import CustomTable from "../components/CustomTable";
import {
  Button,
  Pagination,
  PaginationProps,
  Popover,
  TableColumnsType,
} from "antd";
import { ContractType } from "../types";
import { EditIcon, MoreIcon } from "../assets/images/icon";
import SearchContracts from "../components/SearchContracts";
import store from "../store/ContractsStore";
import CustomModal from "../components/CustomModal";
import useDebounce from "../hooks/useDebounce";

const Contracts = () => {

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    store.setPagination({
      ...store.pagination,
      current,
      pageSize,
    });
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    store.setPagination({
      ...store.pagination,
      current: page,
    });
  };

  const handleEdit = (data: ContractType) => {
    store.setEditData(data);
    store.setOpenModal(true);
  };

  useEffect(() => {
    store.getCourses();
  }, []);

  const debouncedSearchWaiting = useDebounce(store.searchValue, 700);
  
  useEffect(() => {
    store.getContracts(debouncedSearchWaiting);
  }, [debouncedSearchWaiting, store.pagination.current, store.pagination.pageSize]);

  const columns: TableColumnsType<ContractType> = useMemo(() => [
    {
      title: "#",
      dataIndex: "id",
      className: "text-start w-[10%]",
    },
    {
      title: "Nomi",
      dataIndex: "title",
      className: "text-start w-[35%]",
    },
    {
      title: "kurs",
      dataIndex: ["course", "name"],
      className: "text-start",
    },
    {
      render: (_, record) => (
        <Popover
          trigger={'hover'}
          placement="right"
          content={
            <Button
              onClick={() => handleEdit(record)}
              icon={<EditIcon />}
              type="text"
              variant="text"
            >
              Tahrirlash
            </Button>
          }
          arrow={false}
        >
          <button>
            <MoreIcon />
          </button>
        </Popover>
      ),
      className: "text-end",
    },
  ], []);

  return (
    <div className="p-6 ">
      <SearchContracts />
      <CustomTable
        data={store.data.contracts}
        columns={columns}
        loading={store.loading}
      />
      <Pagination
        className="mt-7 justify-end"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        current={store.pagination.current}
        total={store.data.total}
      />
      {store.openModal && <CustomModal />}
    </div>
  );
};

export default observer(Contracts);

import { useEffect, useState } from "react";
import { useGetContracts } from "../hooks/useContracts";
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
import useDebounce from "../hooks/useDebounce";
import CustomModal from "../components/CustomModal";

const Contracts = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editContract, setEditContract] = useState<ContractType | null>(null);
  // pagination start
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
  // pagination end

  // edit contract
  const handleEdit = (data: ContractType) => {
    setEditContract(data);
    setOpenModal(true);
  };


  // debounced value for search
  const debouncedSearchValue = useDebounce(store.searchValue, 500);

  //fetch all contracts
  useEffect(() => {
    async function fetchData() {
      try {
        store.setLoading(true);
        const res = await useGetContracts({
          page: store.pagination.current,
          perPage: store.pagination.pageSize,
          search: debouncedSearchValue,
        });

        store.setContracts(res.data.contracts);
        store.setPagination({
          ...store.pagination,
          total: res.data.total as number,
        });
      } catch (err) {
        console.log(err);
      } finally {
        store.setLoading(false);
      }
    }
    fetchData();
  }, [
    store.pagination.current,
    store.pagination.pageSize,
    debouncedSearchValue,
    store.refresh,
  ]);

  // table columns
  const columns: TableColumnsType<ContractType> = [
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
  ];

  return (
    <div className="p-6 ">
      <SearchContracts setOpenModal={setOpenModal} />
      <CustomTable
        data={store.contracts}
        columns={columns}
        loading={store.loading}
      />
      <Pagination
        className="mt-7 justify-end"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        current={store.pagination.current}
        total={store.pagination.total}
      />
      <CustomModal
        setData={setEditContract }
        data={editContract as ContractType}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default observer(Contracts);

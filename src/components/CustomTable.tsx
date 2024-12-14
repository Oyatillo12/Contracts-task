import React from "react";
import { Table, TableColumnsType } from "antd";
import { ContractType } from "../types";

interface TableType {
  columns: TableColumnsType<ContractType>;
  data: ContractType[];
  loading: boolean;
}

const CustomTable: React.FC<TableType> = ({
  columns,
  data,
  loading,
}) => (
  <Table<ContractType>
    className="border-x-[1px] border-b-[1px] border-[#EDEDED] rounded-b-lg overflow-hidden"
    columns={columns}
    dataSource={data}
    rowKey={"id"}
    loading={loading}
    pagination={false}
  />
);

export default CustomTable;

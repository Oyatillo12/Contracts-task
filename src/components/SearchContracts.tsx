import { Button, Input } from "antd";
import { SearchIcon } from "../assets/images/icon";
import store from "../store/ContractsStore";
import { SetStateAction } from "react";

const SearchContracts: React.FC<{
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setOpenModal }) => {
  return (
    <div className="bg-[#FBFBFB] border border-[#EDEDED] w-full p-6 rounded-t-[10px] flex items-center justify-between">
      <Input
        onChange={(e) => store.setSearchValue(e.target.value)}
        width={"30 %"}
        autoComplete="off"
        size="large"
        id="search"
        placeholder="Qidiruv"
        variant="borderless"
        prefix={<SearchIcon />}
      />
      <Button
        onClick={() => setOpenModal(true)}
        size="large"
        className="!bg-[#0EB182] hover:!bg-[#0EB182]/80"
        type="primary"
        htmlType="button"
      >
        Qo'shish
      </Button>
    </div>
  );
};

export default SearchContracts;

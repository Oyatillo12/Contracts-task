import { Button, Input } from "antd";
import { SearchIcon } from "../assets/images/icon";
import store from "../store/ContractsStore";

const SearchContracts: React.FC = () => {

  const handleOpenModal = () => {
    store.setOpenModal(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.setSearchValue(e.target.value);
  };

  return (
    <div className="bg-[#FBFBFB] border border-[#EDEDED] w-full p-6 rounded-t-[10px] flex items-center justify-between">
      <Input
        onChange={handleSearchChange}
        width={"30%"}
        autoComplete="off"
        size="large"
        id="search"
        placeholder="Qidiruv"
        variant="borderless"
        prefix={<SearchIcon />}
      />
      <Button
        onClick={handleOpenModal}
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

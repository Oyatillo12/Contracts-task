import { Button, Form, Input, Modal, Select, Space, Upload } from "antd";
import React, { SetStateAction, useEffect } from "react";
import { FileAddOutlined } from "../assets/images/icon";
import { ContractType, CourseType, CreateContractsType, } from "../types";
import { useCreateContracts, useEditContracts, useGetCourses, useUploadFileAttachment } from "../hooks/useContracts";
import Notification from "../utils/Notification";
import store from "../store/ContractsStore";
import courseStore from "../store/CoursesStore";
import { observer } from "mobx-react";
import axios from "axios";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

interface ModalType {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  data?: ContractType;
  setData: React.Dispatch<SetStateAction<ContractType | null>>;
}

const CustomModal: React.FC<ModalType> = ({ openModal, setOpenModal, data, setData }) => {
  const [form] = Form.useForm();

  // get the file to form values
  const normFile = (e: UploadChangeParam):UploadFile[] => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // check if the file .docx
  const beforeUpload = (file: File):boolean | string => {
    const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (!isDocx) {
      Notification("error", "Faqat .docx formatdagi fayllarni yuklashingiz mumkin!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  // get the courses start
  useEffect(() => {
    async function fetchData() {
      const contracts = await useGetCourses();
      courseStore.setCourses(contracts);
    }
    fetchData();
  }, []);
  // get the courses end

  // check the edit data start
  useEffect(() => {
    if (openModal) {
      if (data) {
        form.setFieldsValue({
          courseId: data.course?.id,
          title: data.title,
          attachment: data.attachment
            ? [
              {
                uid: "-1",
                name: data.attachment.origName,
                status: "done",
                url: data.attachment.url,
              },
            ]
            : [],
        });
      } else {
        form.resetFields();
      }
    }
  }, [openModal, data, form]);
  // check the edit data end


  // handle form submit start
  const handleSubmit = async (values: CreateContractsType) => {
    try {
      let attachmentData = data?.attachment;
      // file upload if the yes or catch the Notification
      if (values.attachment && values.attachment[0].originFileObj) {
        const res = await useUploadFileAttachment(values.attachment[0].originFileObj);
        if (res.success) {
          // save the attachmentData
          attachmentData = {
            size: res.data[0].size,
            origName: res.data[0].fileName,
            url: res.data[0].path,
          };
        }
      }
      // create or edit the contract data with attachment
      const contractData: ContractType = {
        title: values.title,
        courseId: values.courseId,
        attachment: attachmentData,
      };
      try {
        // check if data exists for edit and update or add contract or catch error
        const contract = data ? await useEditContracts(data?.id as number, contractData) : await useCreateContracts(contractData);
        if (contract.success) {
          setData(null)
          store.setRefresh(!store.refresh);
          Notification("success", data ? "Shartnoma yangilandi" : "Shartnoma qo'shildi");
        }
        setOpenModal(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data?.error?.errId === 165) {
            Notification("error", "Takrorlangan ma'lumot");
            return;
          }
          Notification("error", data ? "Shartnomani yangilashda xatolik" : "Shartnoma qo'shishda xatolik");
        }
      }
    } catch {
      Notification("error", "Fayl yuklashda xatolik");
    }
  };
  // handle form submit end

  // handle modal cancel
  const handleCancelModal = ():void => {
    setOpenModal(false);
    setData(null);
    form.resetFields();
  };

  return (
    <Modal
      title={data ? "Shartnoma o'zgartirish" : "Shartnoma yaratish"}
      open={openModal}
      footer={null}
      onCancel={handleCancelModal}
    >
      <Form
        autoComplete="off"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="courseId"
          label="Kurs"
          rules={[{ required: true, message: "Kurs tanlang" }]}
        >
          <Select size="large" placeholder="Tanlang">
            {courseStore.courses.map((course: CourseType) => (
              <Select.Option key={course.id} value={course.id}>
                {course.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Nomi"
          rules={[
            {
              required: true,
              message: "Nomini kiriting!",
            },
          ]}
        >
          <Input size="large" placeholder="Nomini kiriting" />
        </Form.Item>

        <Form.Item
          name="attachment"
          valuePropName="fileList"
          rules={[{ required: true, message: "Fayl yuklanishi kerak" }]}
          getValueFromEvent={normFile}
        >
          <Upload
            maxCount={1}
            accept=".docx"
            beforeUpload={beforeUpload}
          >
            <Button
              size="large"
              type="dashed"
              icon={<FileAddOutlined />}
              className="!text-[#00C2A8] hover:!border-[#0EB182] w-full"
            >
              Fayl biriktiring
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space className="flex !justify-end">
            <Button
              onClick={handleCancelModal}
              className="hover:!text-[#0EB182] hover:!border-[#0EB182]"
              type="default"
              htmlType="reset"
            >
              Bekor qilish
            </Button>
            <Button
              type="primary"
              className="!bg-[#0EB182] hover:!bg-[#0EB182]/80"
              htmlType="submit"
            >
              {data ? "O'zgartirish" : "Saqlash"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(CustomModal);

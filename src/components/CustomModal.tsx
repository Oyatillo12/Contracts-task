import { Button, ButtonProps, Form, Input, Modal, Select, Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { FileAddOutlined } from "../assets/images/icon";
import { ContractType, CourseType, CreateContractsType, } from "../types";
import Notification from "../utils/Notification";
import store from "../store/ContractsStore";
import { observer } from "mobx-react";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

const CustomModal: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<UploadFile | null>(null);
  const submitBtnProps: ButtonProps = {
    htmlType: "submit",
    className: "!bg-[#0EB182] hover:!bg-[#0EB182]/80"
  }
  const cancelBtnProps: ButtonProps = {
    type: "default",
    htmlType: "reset",
    className: "!text-[#0EB182] hover:!border-[#0EB182]/80"
  }

  const courses = useMemo(() => {
    return store.courses.map((course: CourseType) => ({ label: course.name, value: course.id }));
  }, []);

  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e.fileList;
  }

  const handleUploadChange = (e: UploadChangeParam) => {
    if (e.file) {
      setFile(e.file);
    }
  }

  const beforeUpload = (file: File): boolean | string => {
    const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (!isDocx) {
      Notification("error", "Faqat .docx formatdagi fayllarni yuklashingiz mumkin!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleCancelModal = (): void => {
    store.setOpenModal(false);
    store.setEditData(null);
    form.resetFields();
  };

  useEffect(() => {
    if (store.editData) {
      form.setFieldsValue({
        courseId: store.editData.course?.id,
        title: store.editData.title,
        attachment: store.editData.attachment
          ? [
            {
              uid: "-1",
              name: store.editData.attachment.origName,
              status: "done",
              url: store.editData.attachment.url,
            },
          ]
          : [],
      });
    }
  }, [store.openModal, store.editData, form]);

  const handleSubmit = async (values: CreateContractsType) => {
    try {
      store.setLoading(true);
      let attachmentData = store.editData?.attachment;

      if (file) {
        const uploadedFile = await store.uploadFile(file);
        if (uploadedFile) {
          attachmentData = uploadedFile;
        } else {
          return;
        }
      }

      const contractData: ContractType = {
        title: values.title,
        courseId: values.courseId,
        attachment: attachmentData,
      };
      await store.addorEditContract(contractData, store.editData?.id);
      handleCancelModal();
    } catch (error) {
      Notification("error", "Xatolik yuz berdi");
    } finally {
      store.setLoading(false);
    }
  };

  return (
    <Modal
      title={store.editData ? "Shartnoma o'zgartirish" : "Shartnoma yaratish"}
      open={store.openModal}
      onOk={() => form.submit()}
      onClose={handleCancelModal}
      confirmLoading={store.loading}
      okText={store.editData ? "O'zgartirish" : "Saqlash"}
      cancelText="Bekor qilish"
      onCancel={handleCancelModal}
      okButtonProps={submitBtnProps}
      cancelButtonProps={cancelBtnProps}
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
          <Select options={courses} size="large" placeholder="Tanlang" />
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
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Fayl yuklanishi kerak" }]}
        >
          <Upload
            maxCount={1}
            accept=".docx"
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
          >
            <Button
              size="large"
              type="dashed"
              htmlType="button"
              icon={<FileAddOutlined />}
              className="!text-[#00C2A8] hover:!border-[#0EB182] w-full"
            >
              Fayl biriktiring
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(CustomModal);


import companyData from "../../data/company.json";

export const getCompany = async () => {
  return {
    status: 200,
    data: {
      message: "Lấy thông tin công ty thành công",
      data: companyData // Trả về thẳng Object thông tin cấu hình
    }
  };
};
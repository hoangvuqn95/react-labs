import studentApi from "api/studentApi";

const getStudentListStart = () => ({
  type: 'students/getStudentListStart',
  
});

const getStudentListSuccess = (data) => ({
  type: 'students/getStudentListSuccess',
  payload: data,
});

const getStudentListFailed = (error) => ({
  type: 'students/getStudentListFailed',
  payload: error,
});

// Async action - redux thunk
export const getStudentList = (params) => {
  return async (dispatch) => {
    try {
      dispatch(getStudentListStart());

      const response  = await studentApi.getAll(params);
      const action = getStudentListSuccess(response);
      dispatch(action)
    } catch (error) {
      const action = getStudentListFailed(error);
      dispatch(action);

      throw error
    }
  };
};
// thay vi dung` loading va error o tren action thi` nen dung loading va error o component
// chi nen dung action de lang nghe 1 cai gi do chu ko nen return du lieu tu action ve component

// reducer ko nhan duoc funtion , no chi nhan du lieu o dang object
// Luon luon co 3 truong hop

// action ko chi dispatch 1 reducer hien tai, ma con co the dispatch nhieu` cai reducer cung duoc(phai dung` async await) do goi la complex action. Nhung phai control duoc no
// 2 state loading va error cua API khuyen khich dung` tren component, khong nen dung tren redux
// Khong bao gio dung global loading lam` state cua redux

// Luon luon phan tich task can lam` tren giay, handle moi thu

// Immer js library: clone 1 mang tu dong cho minh`, apply ban chinh sua
// Truoc day phai clone ra roi moi chinh sua
// current -> draft -> next
// No tao 1 cai ban nhap(draft) la ham`: tai day minh` se chinh sua them
// immer se cap nhat 1 mang moi tu` array cu + apply du lieu tu` ban nhap  
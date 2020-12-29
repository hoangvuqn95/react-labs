const getInitialTodoList = () => {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch (error) {}
};
// parse la` chuyen du lieu ve dang mang array
// try catch de kiem tra tranh loi va chi render 1 lan` 

const initialState = {
  list: getInitialTodoList,
  filters: {
    completed: 'all',
  },
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'todo/add': {
      const newList = [...state.list];
      newList.push(action.payload);
      return {
        ...state,
        list: newList,
      };
    }
      
    case 'todo/remove': {
      return {
        ...state,
        list: state.list.filter((x) => x.id !== action.payload),
      };
    }
    case 'todo/update': {
      const todo = action.payload;
      // vi payload cua action cua todo/update(edit) la` todo, chu khong phai id, nen phai gan todo = action.payload => todo.id
      const newList = [...state.list];
      const updatedIdx = newList.findIndex((x) => x.id === todo.id);
      if (updatedIdx < 0) return state;

      newList[updatedIdx] = {
        ...newList[updatedIdx],
        ...todo,
      };

      return {
        ...state,
        list: newList,
      }
    }

    case 'todo/setFilters': {
      return {
        ...state,
        filters: action.payload,
      }
    }

    default: 
    return state;
  }
};

export default todoReducer;
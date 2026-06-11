import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './features/public/companySlice';



export const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});



// Cách dùng
//   dispatch acction tương ứng, sẽ gọi reducer tương ứng
//   const dispatch = useDispatch()
//   dispatch(setRole(response.data.data))

// Cách gọi

//   const adminRole = useSelector((state) => state.adminRole.role)





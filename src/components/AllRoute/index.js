import { useRoutes } from "react-router-dom";
import { route } from "../Route";


function AllRoutes() {
  const element = useRoutes(route);
  return element;
}

export default AllRoutes;
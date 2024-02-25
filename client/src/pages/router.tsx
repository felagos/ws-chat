import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, ChatPage, RegisterPage } from ".";
import { RoutesEnum } from "../enum";
import { PublicLayout, PrivateLayout } from "../component";

export const Router = () => {
	return (
		<BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />} >
          <Route index element={<Navigate to={RoutesEnum.LOGIN} replace />} />
          <Route path={RoutesEnum.LOGIN} element={<LoginPage />} />
          <Route path={RoutesEnum.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route path="chat/*" element={<PrivateLayout />} >
          <Route index element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
	);
}
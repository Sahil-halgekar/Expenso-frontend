import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnonymous from "./components/IsAnonymous";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import GroupByIdPage from "./pages/GroupByIdPage/GroupByIdPage";
import ExpenseByIdPage from "./pages/ExpenseByIdPage/ExpenseByIdPage";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./pages/profile/Profile";
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<LayoutsWithNavbar />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/profile"
              element={
                <IsPrivate>
                  <Profile />
                </IsPrivate>
              }
            />
            <Route
              path="/home"
              element={
                <IsPrivate>
                  <Home />
                </IsPrivate>
              }
            />
            <Route
              path="/groups"
              element={
                <IsPrivate>
                  <GroupsPage />
                </IsPrivate>
              }
            />
            <Route
              path="/groups/:groupId"
              element={
                <IsPrivate>
                  <GroupByIdPage />
                </IsPrivate>
              }
            />
            <Route
              path="/groups/:groupId/expenses/:expenseId"
              element={
                <IsPrivate>
                  <ExpenseByIdPage />
                </IsPrivate>
              }
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>

          <Route
            path="/login"
            element={
              <IsAnonymous>
                <LoginPage />
              </IsAnonymous>
            }
          />
          <Route
            path="/signup"
            element={
              <IsAnonymous>
                <SignupPage />
              </IsAnonymous>
            }
          />
        </Routes>
      </div>
    </>
  );
}
function LayoutsWithNavbar() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;

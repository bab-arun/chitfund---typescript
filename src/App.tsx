/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from "react-router-dom";
import { UserNavbar } from "./UserComponent/UserNavbar";
import { AdminHomepage } from "./AdminComponent/scheme/AdminHomepage";
// import { UserHomepage } from "./UserComponent/UserHomepage";
import { AdminNavbar } from "./AdminComponent/AdminNavbar";
// import { CreateScheme } from "./AdminComponent/CreateScheme";

 import { AssignScheme } from "./AdminComponent/AssignScheme";
 import { AdminEntry } from "./AdminComponent/AdminEntry";
// import { AcceptPayment } from "./AdminComponent/AcceptPayment";
// import { PendingPayment } from "./AdminComponent/PendingPayment";
// import { ShowProgress } from "./AdminComponent/ShowProgress";
// import { UpdatePayment } from "./UserComponent/UpdatePayment";
// import { PaymentHistory } from "./UserComponent/PaymentHistory";
import { LoginPage } from "./LoginComponent/LoginPage";
// import { UsersPendingPayment } from "./AdminComponent/UsersPendingPayment";
// import { PendingPayUser } from "./AdminComponent/PendingPayUser";
// import { AvailableChit } from "./UserComponent/AvailableChit";
// import { UserSchemes } from "./UserComponent/UserSchemes";
import { useState, createContext,
  //  useReducer 
  } from "react";
import { CreateUser } from "./AdminComponent/user/CreateUser";

  // type declaration for linkSchemeName
  export type schemeName = {
    linkSchemeName: string
    setLinkSchemeName:(c: string) => void
  }

 export const ChitSchemeContext = createContext<schemeName>({
  linkSchemeName: '', // set a default value
  setLinkSchemeName: () => {},
  }); //assign scheme

// export const UserContext = createContext(null); //userCode

// const initialState = "";
// const reducer = (state, action) => {
//   state = action;
//   return state;
// };

function App() {
  // const [userCode, dispatch] = useReducer(reducer, initialState);

  const [linkSchemeName, setLinkSchemeName] = useState("");

  return (
    <div>
      <ChitSchemeContext.Provider value={{ linkSchemeName, setLinkSchemeName }}>
        {/* <UserContext.Provider */}
          {/* value={{ userCode: userCode, dispatch: dispatch }}
        > */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/usernavbar" element={<UserNavbar />} />
            <Route path="/adminhomepage" element={<AdminHomepage />} />
            <Route path="/adminnavbar" element={<AdminNavbar />}/>
             <Route path="/createuser" element={<CreateUser />} />
             <Route path="/assignscheme" element={<AssignScheme />} />
             <Route path="/adminentry" element={<AdminEntry />} />
             <Route
              path="/adminentry/:scheme/:amount"
              element={<AdminEntry />}
            />
            {/* <Route path="/userhomepage" element={<UserHomepage />} />
            <Route path="/createscheme" element={<CreateScheme />} />
             */}
          

            {/* 
            <Route path="/acceptpayment" element={<AcceptPayment />} />
            <Route path="/pendingpayment" element={<PendingPayment />} />
            <Route path="/showprogress" element={<ShowProgress />} />
            <Route path="/updatepayment" element={<UpdatePayment />} />
            <Route
              path="/updatepayment/:schemeName"
              element={<UpdatePayment />}
            />
            <Route path="paymenthistory" element={<PaymentHistory />} />
            <Route path="userschemes" element={<UserSchemes />} />
            <Route
              path="/userspendingpayment/:schemeId/:schemeName"
              element={<UsersPendingPayment />}
            />
            <Route
              path="/pendingpayuser/:schemeName/:userCode"
              element={<PendingPayUser />}
            />
            <Route
              path="/paymenthistory/:schemeName"
              element={<PaymentHistory />}
            />
            <Route path="/availablechitschemes" element={<AvailableChit />} /> */}
          </Routes>
        {/* </UserContext.Provider> */}
      </ChitSchemeContext.Provider>
    </div>
  );
}

export default App;

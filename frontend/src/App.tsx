// import './App.css'
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import {HomePage} from "./pages/website/HomePage.tsx";
// import {About} from "./pages/website/About.tsx";
// import {Contact} from "./pages/website/Contact.tsx";
// import {Charities} from "./pages/website/Charities.tsx";
// import {DonationDetails} from "./pages/website/DonationDetails.tsx";
// import {RootLayout} from "./components/RootLayout.tsx";
//
// import {Login} from "./pages/dashboard/Login.tsx";
// import {Register} from "./pages/dashboard/Register.tsx";
// import {Dashboard} from "./pages/dashboard/Dashboard.tsx";
// import {Charities as ch} from "./pages/dashboard/Charities.tsx";
// import {Cause} from "./pages/dashboard/Cause.tsx";
// import {Admin} from "./pages/dashboard/Admin.tsx";
// import {Donors} from "./pages/dashboard/Donors.tsx";
// import {Profile} from "./pages/dashboard/Profile.tsx";
//
// function App() {
//     const routes = createBrowserRouter([
//       {
//         path: '',
//         element : <RootLayout/>,
//         children : [
//           { path : '', element : <HomePage/>},
//           { path : '/about', element : <About/>},
//           { path : '/contact', element : <Contact/>},
//           { path : '/charities', element : <Charities/>},
//           { path : '/donation', element : <DonationDetails/>},
//
//           { path : '/login', element : <Login/>},
//           { path : '/register', element : <Register/>},
//           { path : '/dashboard', element : <Dashboard/>},
//           { path : '/crop', element : <ch/>},
//           { path : '/fields', element : <Cause/>},
//           { path : '/vehicles', element : <Admin/>},
//           { path : '/staff', element : <Donors/>},
//           { path : '/profile', element : <Profile/>}
//         ]
//       },
//     ])
//
//   return (
//     <>
//       <RouterProvider router={routes} />
//     </>
//   )
// }
//
// export default App


import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/website/HomePage.tsx";
import { About } from "./pages/website/About.tsx";
import { Contact } from "./pages/website/Contact.tsx";
import { Charities } from "./pages/website/Charities.tsx";
import { DonationDetails } from "./pages/website/DonationDetails.tsx";
import { RootLayout } from "./components/RootLayout.tsx";

import { Login } from "./pages/dashboard/Login.tsx";
import { Register } from "./pages/dashboard/Register.tsx";
import { Dashboard } from "./pages/dashboard/Dashboard.tsx";
import { Charities as DashboardCharities } from "./pages/dashboard/Charities.tsx";
import { Cause } from "./pages/dashboard/Cause.tsx";
import { Admin } from "./pages/dashboard/Admin.tsx";
import { Donors } from "./pages/dashboard/Donors.tsx";
import { Profile } from "./pages/dashboard/Profile.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      children: [
        { path: '', element: <HomePage /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'charities', element: <Charities /> },
        { path: 'donation', element: <DonationDetails /> },

        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'dashboard/charities', element: <DashboardCharities /> },
        { path: 'dashboard/causes', element: <Cause /> },
        { path: 'dashboard/admin', element: <Admin /> },
        { path: 'dashboard/donors', element: <Donors /> },
        { path: 'dashboard/profile', element: <Profile /> }
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
import CreateEmployee from "./components/createemployee/CreateEmployee";
import ListEmployees from "./components/listemployees/ListEmployees";

const App = () => {

    const handleEmployeeSubmit = () => {
        console.log("Employee created successfully!");
    };

    return (
        <Router>
            <div id="wrapper">
                <Header/>
                <div id="main">
                    <Routes>
                        <Route path="/list-all" element={<ListEmployees/>}/>
                        <Route path="/create" element={<CreateEmployee onSubmit={handleEmployeeSubmit}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

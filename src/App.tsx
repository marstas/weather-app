import React from "react";
import {getCityId} from "./utils";
import "./App.scss";

const App: React.FC = () => <h1>{getCityId("Vilnius")}</h1>;

export default App;

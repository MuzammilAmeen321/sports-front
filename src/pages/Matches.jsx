import { useState } from "react";
import Header from "../components/MatcheTabs";
import ModernTabs from "../components/MatchTabs/MatchsTab";
const Matches = () => {


  return (
   <>
   <div className="container">
    <div className="row">
        <div className="col-12">
        <ModernTabs page="matches" /> 
        </div>
    </div>
   </div>
   </>
  );
};

export default Matches;

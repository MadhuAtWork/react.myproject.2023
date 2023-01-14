import * as React from 'react';
import MyTaskDetailsList from './MyTaskDetailsList';
import { useLocation } from 'react-router-dom';

function MyTaskDetailsDashboard(props) {

  return (
    <>
      <div className="App">
        <div className="sidebarcontainer"> 
          <MyTaskDetailsList /></div>
      </div>
    </>
  );
}

export default MyTaskDetailsDashboard;
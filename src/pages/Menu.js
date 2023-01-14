import * as React from 'react';
import { useState, useEffect } from "react";
import SvgIcon from '@mui/material/SvgIcon';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import ApplicationDetails from './ApplicationDetails';




function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function Mymenu(props) {
    const [usertdata, setuserdata] = useState(false);
    const [usertdata1, setuserdata1] = useState(false);
    const [usertdata2, setuserdata2] = useState(false);
    const [navbar, setnavbar] = useState(false);
    // const [data, setdata] = useState();
    const [Menudata, setMenudata] = useState([]);
    
    // const [mainmenu,setmenu] = useState([])

    const Navigate = useNavigate()


    const onhandleOperationtray = () => {
        setuserdata(!usertdata);
    }

    const onhandleMeetingCenter = () => {
        setuserdata1(!usertdata1);
    }


    const onhandleReport = () => {
        // setMenudata(mainmenuList.menu)
        setuserdata2(!usertdata2);
    }

    const onhandlechange = () => {
        // setMenudata(mainmenuList.menu)

        setnavbar(!navbar);
    }

    const location = useLocation();
    const mainmenuList = location.state;
    console.log(mainmenuList);
    console.log(mainmenuList.menu);

    useEffect(() => {
        // setTimeout(() => {
            setMenudata(mainmenuList.menu) 
        //   }, 10);
            // setMenudata(mainmenuList.menu) 
    }, []);

    const onHandleMenuMytask = () => {
        Navigate("/index/MyTask", { state: mainmenuList })
        setnavbar(!navbar);
    }
    const onHandleAssignTask = () => {
        Navigate("/index/assignTask", { state: mainmenuList })
    }
    const onhandleAddMc = () => {
        Navigate("/index/AddMeetingMaster", { state: mainmenuList })
    }
    const onHandleCrecUpadte =() =>{
        Navigate("/index/CRECBulkUpadate", { state: mainmenuList })    
    }
    const OnHandleMigrate = () =>{
        Navigate("/index/Migrate", { state: mainmenuList })    
    }
    const onHandleNFD = () =>{
        Navigate("/index/Migrate", { state: mainmenuList })    
    }

    return (
        <>
            <Header userdata={mainmenuList}/>
            <div className="main">
                <div className="menu">
                    <div className={navbar ? "sidenav" : "unset_sidenav"}>
                        <div className="menuIcon" onClick={onhandlechange}><FontAwesomeIcon icon={faBars} /></div>
                        {navbar ? <> <div className="holder"></div>
                            <div>
                                <div className="holder" onClick={onhandleOperationtray}><HomeIcon className="me-3" />{Menudata[0].menuDesc}</div>
                                {usertdata ?
                                    <>
                                        <div className="subMenu">
                                            <div className="assignTask" onClick={onHandleAssignTask}> <p>{Menudata[1].menuDesc}</p></div>
                                            <div className="Mytask" onClick={onHandleMenuMytask}><p>{Menudata[2].menuDesc}</p> </div>
                                        </div>
                                    </>
                                    :
                                    ""}
                            </div>
                            <div>
                                <div className="holder" onClick={onhandleMeetingCenter}><HomeIcon className="me-3" />{Menudata[3].menuDesc}</div>
                                {usertdata1 ?
                                    <>
                                        <div className="subMenu">
                                            <div className="addMc" onClick={onhandleAddMc}><p>{Menudata[4].menuDesc}</p></div>
                                            <div className="Crecupdate" onClick={onHandleCrecUpadte}> <p>{Menudata[5].menuDesc}</p> </div>
                                            <div className="MigrateMc" onClick={OnHandleMigrate}> <p>{Menudata[6].menuDesc}</p> </div>
                                            <div className="nfd" onClick={onHandleNFD}><p>{Menudata[7].menuDesc}</p></div>
                                        </div>
                                    </>
                                    :
                                    ""}
                            </div>
                            <div>
                                <div className="holder" onClick={onhandleReport}><HomeIcon className="me-3" />{Menudata[8].menuDesc}</div>
                                {usertdata2 ?
                                    <>
                                        <div className="subMenu">
                                            <div className="report1" >
                                                <p>{Menudata[9].menuDesc}</p>
                                            </div>
                                            <div className="report2" >
                                                <p>{Menudata[10].menuDesc}</p>
                                            </div>
                                            <div className="report3" >
                                                <p>{Menudata[11].menuDesc}</p>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    ""}
                            </div>
                        </>
                            : <> <div className="holder"></div>
                                <div className="holder"> <HomeIcon /></div>
                                <div className="holder"> <HomeIcon /></div>
                                <div className="holder"> <HomeIcon /></div>
                            </>}  </div>
                </div>
                <div className="section">

                    <Outlet>

                        {/* <ApplicationDetails></ApplicationDetails> */}
                    </Outlet>
                </div>
            </div>
        </>
    )
}
export default Mymenu; 
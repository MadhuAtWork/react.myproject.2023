import React from 'react';
import TableNew from '../Components/Table';
import Table2 from '../Components/NewTable2';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import { useState } from "react";
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { LinkOffRounded } from '@mui/icons-material';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const columns = [
  { id: 'Product_code', label: 'Product code', },
  { id: 'Loan_Account_No', label: 'Loan Account No', },
  { id: 'URN', label: 'URN', },
  { id: 'Opportunity_Status', label: 'Opportunity Status', },
  { id: 'Credit_Bureau_Status', label: 'Credit Bureau Status', },
  { id: 'Client_Name', label: 'Client Name', },
  { id: 'Loan_Amount', label: 'Loan Amount', },
  { id: 'Action', label: 'Action', },
];
const Historycolumns = [
  { id: 'Sr', label: 'Sr', },
  { id: 'Task_Namr', label: 'Task Name', },
  { id: 'Start Time', label: 'Start Time', },
  { id: 'End_Time', label: 'End Time', },
  { id: 'Time_Diffrencs', label: 'Time Diff (In Sec)', },
  { id: 'User', label: 'User', },
  { id: 'Remark', label: 'Remark', },
];

function ApplicationDetails(props) {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [applicationDetail, setApplicationDetail] = useState([]);
  const [disabled, setdisabled] = React.useState(false);
  const [leadRecord, setLeadRecord] = React.useState('');
  const [defailtValue, setDefailtValue] = React.useState('');
  const [historyData, setHistoryData] = React.useState([]);
  const [action, setAction] = React.useState('');
  const [taskId, setTaskId] = React.useState('');
  const Navigate = useNavigate();
  const location = useLocation();



  const onhandletabsCahnge = (batchNo, leadId, taskId) => async (e) => {
    e.preventDefault();

    setdisabled(true)

    setTaskId(taskId)
 
    const requestleadRecords = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "batchNo": batchNo,
        "leadId": leadId
      }),
    };
    fetch('http://192.168.0.196:8090/fetchLeadLvlDtl', requestleadRecords)
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        setLeadRecord(response)
        setHistoryData(response.auditTrail)
        console.log(response.auditTrail)


      })

    // setDefailtValue(leadRecord)
  }
  const handleSubmit = (taskID, actionValue) => async (e) => {
    e.preventDefault();

    setdisabled(true)
    console.log(taskID)
    console.log(actionValue)

    const requestleadRecords = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "executorID": "Ashish",
        "taskID": taskID,
        "actionValue": actionValue
      }),
    };
    fetch('http://192.168.0.196:8090/completeTask', requestleadRecords)
      .then(response => response.json())
      .then((response) => {
        console.log(response)
      })
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDropdown = (event) => {
    setAction(event.target.value);
  };
  const handleSave = () => {
    alert('Data Sent Successfuly')
  };

  // const F1 = location.state.F1 ;

  const F1 = props.data;

  React.useEffect(() => {
    const requestApplicationDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "f1": F1
      }),
    };
    fetch('http://192.168.0.196:8090/applicationDetails', requestApplicationDetails)
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        setApplicationDetail(response)
      })
  }, []);

  // for (var count = 1; count < 0; count++) {
  //   console.log(count);
  //   return count
  // }

  // const menu = props.data.menu;
  // console.log(location.state);
  const mainmenuList = location.state;
console.log(mainmenuList);

const onHandleApplicationCancel = () => {
  Navigate('/index/MyTask',{ state: mainmenuList });
}

  return (
    <>
      <div className="card mt-4">
        <div className="card-header  bg-orenge py-2">
         Application No ( {F1} )
        </div>
        <div className="card-body">

          <div className='Tabs'>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='tab-btn' label="Opportunities" />
              <Tab className='tab-btn' label="Application" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Opportunity" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Primary Borrower" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="Co-Borrower" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="KYC" disabled={disabled ? false : true} />
              <Tab className='tab-btn' label="History" disabled={disabled ? false : true} />
            </Tabs>

            <TabPanel value={value} index={0}>
              <div className="mb-4" >
                <TableNew data={F1} />
              </div>

              <div>
                <form>
                  <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ top: 0, minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {applicationDetail
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                  <TableCell >{row.productCode}</TableCell>
                                  <TableCell >{row.lanNo}</TableCell>
                                  <TableCell >{row.urn}</TableCell>
                                  <TableCell >{row.status}</TableCell>
                                  <TableCell >{row.pcCbStatus}</TableCell>
                                  <TableCell >{row.customerName}</TableCell>
                                  <TableCell className='text-center' >{row.loanAmount}</TableCell>
                                  <TableCell className="text-center editicon">
                                    <FontAwesomeIcon className='fs-5 text-orenge cursor-pointer'
                                      icon={faPenToSquare}
                                      onClick={onhandletabsCahnge(row.batchNo, row.leadId,row.taskId)}
                                    />

                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={applicationDetail.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </form>
              </div>

              <div className='mt-3  d-flex justify-content-end ' >
                <div className='col-2'>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Action</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={action}
                      label="Action"
                      onChange={handleChangeDropdown}
                    >
                      <MenuItem value={0}>--Select--</MenuItem>
                      <MenuItem value={1}>Procced Further</MenuItem>
                      <MenuItem value={2}>Re-hit</MenuItem>
                      <MenuItem value={9}>Reject</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button className='ms-3 bg-orenge' onClick={handleSubmit(taskId,action)} variant="contained">Submit</Button>
                <Button className='ms-3 bg-orenge' variant="contained" onClick={onHandleApplicationCancel}>Cancel</Button>
              </div>
            </TabPanel>

            <TabPanel className="Application" value={value} index={1} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Product Code" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.productCode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Area Code" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.areaCode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Branch Code" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.branchCode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Meeting Center Name" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.meetingCentreName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="MCL URN No" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.mclUrn} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Status" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.status} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="No. of Customers" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.batchCount} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Batch Type" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.batchType} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Remark" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.remarks} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Rate Of Interest" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.rateofInterest} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Tenure" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.tenure} fullWidth />
                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="Opprotunity" value={value} index={2} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Lead ID" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.leadId} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Loan Cycle" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.loanCycle} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Pincode" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.pincode} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Loaan Amount" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.disbursementAmount} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="City" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.city} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="State" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.state} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Loan Purpose" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.loanPurpose} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="CB Check" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.pcCbStatus} fullWidth />
                  </div>

                  <div className='col-6'>
                    <TextField id="outlined-basic" label="AML Status" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.pcAMLStatus} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Dedupe Status" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.pcDedupeStatus} fullWidth />
                  </div>
                </div>
                <div className='mt-3  d-flex justify-content-end '>
                  <Button className='ms-3 bg-orenge' onClick={handleSave} variant="contained">Save</Button>

                </div>
              </form>
            </TabPanel>

            <TabPanel className="PrimaryBorrower" value={value} index={3} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="URN" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.urn} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.firtName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Middle Name" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.middleName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.lastName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="DOB" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.dateofBirth} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Mobile No" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.mobileNo} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Agriculture Land" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.agriLand} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Age" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.age} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Annual Income" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.annualIncome} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Gender" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.gender} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Marital Status" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.maritalStatus} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Permanent Address" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.permanentAddres} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Present Address" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.presentAddress} fullWidth />
                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="CoBorrower" value={value} index={4} disabled={disabled ? false : true}>
              <form>
                <div className='row g-4'>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.firtName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Middle Name" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.middleName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.lastName} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="DOB" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.dateofBirth} fullWidth />
                  </div>
                  <div className='col-6'>
                    <TextField id="outlined-basic" label="Mobile No" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.mobileNo} fullWidth />
                  </div>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="KYC" value={value} index={5} disabled={disabled ? false : true}>
              <form>
                <div className='Borrover p-3 border mb-4'>
                  <div className='row g-4'>
                    <h4 className='text-orenge'>Borrower</h4>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Type " variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdType1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Value" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdVal1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Type" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdType2} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Value" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.primaryCustIdVal2} fullWidth />
                    </div>
                  </div>
                </div>
                <div className='Co-Boorover p-3 border'>
                  <div className='row g-4'>
                    <h4 className='text-orenge'>Co-Borrower</h4>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Type " variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.secCustIdType1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Primary ID Value" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.secCustIdVal1} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Type" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.secCustIdType2} fullWidth />
                    </div>
                    <div className='col-6'>
                      <TextField id="outlined-basic" label="Secondary ID Value" variant="outlined" autoComplete='off' multiline defaultValue={leadRecord.secCustIdVal2} fullWidth />
                    </div>
                  </div>
                </div>
                <div className='col-12 mt-3 d-flex justify-content-end'>
                  <Button className='me-3 bg-orenge' variant="contained" href=''>View Document</Button>
                </div>
              </form>
            </TabPanel>

            <TabPanel className="History" value={value} index={6} disabled={disabled ? false : true}>
              <div>
                <form>
                  <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {Historycolumns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ top: 0, minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {historyData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                  <TableCell >{index + 1}</TableCell>
                                  <TableCell >{row.taskName}</TableCell>
                                  <TableCell >{row.startTime}</TableCell>
                                  <TableCell >{row.endTime}</TableCell>
                                  <TableCell >{row.timeDiff}</TableCell>
                                  <TableCell >{row.assignee}</TableCell>
                                  <TableCell >{row.remarkss}</TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={historyData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </form>
              </div>
            </TabPanel>
          </div>

        </div>
      </div>
    </>
  );
}

export default ApplicationDetails;

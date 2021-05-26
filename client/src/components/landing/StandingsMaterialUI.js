import React, { useState } from 'react';

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, TablePagination, Typography, TableRow, TableHead, TableContainer, TableFooter, TableCell, TableBody, IconButton, Collapse, Box, Table }from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RegistrationContext from '../../context/registration/registrationContext';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';

const StyledTableCell = withStyles((theme) => ({

  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: '1rem',
    paddingRight:4, 
    paddingLeft: 5,
   


    
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'grey',
    },
   
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: "100%",
    backgroundColor: '',

  },
  test: 
  {
    display: "table-cell",
    padding: '0px',
    fontSize: "0.875rem",
    /* text-align: left; */
    fontFamily: "Roboto, Helvetica, Arial, sansSerif",
    fontWeight: 400,
    lineHeight: 1.43,
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    letterSpacing: "0.01071em",
    verticalAlign: 'inherit',


  },

});

//start pagination
const useStyles1 = makeStyles((theme) =>({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


function TablePaginationActions(props){
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props ;
  const handleFirstPageButtonClick = (event) =>{
    onChangePage(event, 0);
  };
  const handleBackButtonClick = (event) =>{
    onChangePage(event, page - 1);
  };
  const handleNextButtonClick = (event) =>{
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event) =>{
    onChangePage(event, Math.max(0, Math.ceil(count/rowsPerPage) - 1));
  }
  return (
    <div className={classes.root}>
    <IconButton
    onClick={handleFirstPageButtonClick}
    disabled={page===0}
    aria-label="first-page"
    >
    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
    {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
    </IconButton>
    <IconButton
    onClick={handleNextButtonClick}
    disabled={page >=Math.ceil(count/rowsPerPage) -1}
    aria-label='next page' >
    {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
    </IconButton>
    <IconButton
    onClick={handleLastPageButtonClick}
    disabled={page >= Math.ceil(count /rowsPerPage) - 1}
    aria-label='last page'>
    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
    </div>);
}
//end initial pagination

function Row(props) {
  const { row, index, allOpen } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();


  return (
    <React.Fragment>
      <StyledTableRow >
        <StyledTableCell className={classes.test} align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell  align="center" component="th" scope="row">
          {index + 1}
        </StyledTableCell>
        <StyledTableCell align="center">{row.teamName}</StyledTableCell>
        <StyledTableCell align="center">{0}</StyledTableCell>
        <StyledTableCell align="center">{row.miles.total}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={allOpen ? !open : open} timeout="auto" unmountOnExit>
            <Box >
              <Typography variant="h6" gutterBottom component="div">
                Team Members
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">City</StyledTableCell>
                    <StyledTableCell align="center">State</StyledTableCell>
                    
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  { row.team.map((person, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center" component="th" scope="row">
                        {person.participantName}
                      </StyledTableCell>
                      <StyledTableCell align="center">{person.participantCity}</StyledTableCell>
                      <StyledTableCell align="center" >
                        {person.participantState}
                      </StyledTableCell >
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}





export default function StandingsMaterialUI({results}) {
  const classes = useStyles();
  const [allOpen, setAllOpen] = useState(false);
  const handleOpen = () =>{
    setAllOpen(!allOpen);   
  }

    //new paginate
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const emptyRows = rowsPerPage - Math.min(rowsPerPage, results.length - page * rowsPerPage);
const handleChangePage = (event, newPage) =>{
  setPage(newPage);
}
const handleChangeRowsPerPage = (event) =>{
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);

}
// end new paginate
  return (
    <TableContainer style={{maxWidth: '100%', overflowX: 'hidden'}}component={Paper} >
      <Table aria-label="collapsible table" className={classes.table} aria-label="customized table" >
        <TableHead>
          <StyledTableRow>
            <StyledTableCell  align="center" className={classes.test} onClick={handleOpen}> {allOpen ? '👇' : 'Team 👉'} </StyledTableCell>
            <StyledTableCell align="center"  className={classes.test}   >Rank</StyledTableCell>
            <StyledTableCell  align="center" className={classes.test}  >Team Name</StyledTableCell>
            <StyledTableCell  align="center" className={classes.test}  >Total Score</StyledTableCell>
            <StyledTableCell  align="center" className={classes.test}  >Total Miles</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : results).map((row, index) => (
            <Row key={row.teamName} row={row} index={index} allOpen={allOpen} />
          ))}
          { emptyRows > 0 && (
            <TableRow style={{height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
            </TableRow>
            )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
            rowsPerPageOptions={[5,10,25, { label: 'All', value: -1}]}
            colSpan={3}
            count={results.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}></TablePagination>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

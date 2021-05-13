import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Paper, TablePagination }from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import RegistrationContext from '../../context/registration/registrationContext';

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




function Row(props) {
  const { row, index, allOpen } = props;
  const [open, setOpen] = React.useState(false);
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
                  {row.team.map((person, index) => (
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
  const [allOpen, setAllOpen] = React.useState(false);
 
  const handleOpen = () =>{
    setAllOpen(!allOpen);
    
  }
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
          {results.map((row, index) => (
            <Row key={row.teamName} row={row} index={index} allOpen={allOpen} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

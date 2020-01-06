import React from 'react';
import moment from 'moment';
import './App.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import Icon360 from '@material-ui/icons/ThreeSixty';
import NavigationIcon from '@material-ui/icons/Navigation';

const objectMap = (obj, fn) => (
  Object.entries(obj).map(
    ([k, v], i) => [fn(v, k, i)]
  )
)

function Flights(props) {
  const { flights, outbound } = props;

  return (
    <div>
      <Typography variant="h4" component="h1" style={{ paddingTop: 20, paddingBottom: 10 }}>
        { outbound ? 'Utresa' : 'Hemresa' }
      </Typography>
      {
        flights !== null && (
          objectMap(flights, (outboundFlight => (
            <Paper key={outboundFlight.id.toString()} style={{ marginBottom: 30 }} elevation={7}>
              <Table size="small" style={{ maxWidth: 1400 }}>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ borderBottom: 0, width: 30 }}>
                      <Tooltip title="Travel from airport to airport">
                        <LocalAirportIcon fontSize="small" />
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{ borderBottom: 0 }}>
                      <Table size="small" style={{ margin: 0, padding: 0 }}>
                        <TableBody style={{ margin: 0, padding: 0 }}>
                          <TableRow style={{ margin: 0 }}>
                            <TableCell style={{ borderBottom: 0, margin: 0, padding: 0 }}>
                              {`${outboundFlight.origin.name} ${outboundFlight.origin.code} (${outboundFlight.originCity.name}, ${outboundFlight.originCountry.name}) at ${moment(outboundFlight.startTimeInLocal).format('hh:mm')}`}
                            </TableCell>
                            <TableCell style={{ borderBottom: 0 }}>
                              <Tooltip title="to airport">
                                <FlightTakeoffIcon fontSize="small" />
                              </Tooltip>
                            </TableCell>
                              <TableCell style={{ borderBottom: 0 }}>
                                {`${outboundFlight.destination.name} ${outboundFlight.destination.code} (${outboundFlight.destinationCity.name}, ${outboundFlight.destinationCountry.name}) at ${moment(outboundFlight.endTimeInLocal).format('hh:mm')}`}
                              </TableCell>
                              {
                                outboundFlight.via && outboundFlight.via.map((stop) => (
                                  <React.Fragment>
                                    <TableCell style={{ borderBottom: 0 }}>
                                      <Tooltip title="via">
                                        <Icon360 />
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell style={{ borderBottom: 0 }}>
                                      {`${stop.code} ${stop.name} for ${stop.haltDuration}`}
                                    </TableCell>
                                  </React.Fragment>
                                ))
                              }
                              <TableCell style={{ borderBottom: 0 }}>
                                <Tooltip title="Time in air">
                                  <AccessTimeIcon fontSize="small" />
                                </Tooltip>
                              </TableCell>
                              <TableCell style={{ borderBottom: 0 }}>
                                {outboundFlight.connectionDuration}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Divider />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          {
                            objectMap(outboundFlight.cabins, (cabin, cabinKey) => (
                              <TableCell style={{ borderBottom: 0 }}>
                                <div style={{
                                  backgroundColor: '#2c3e50',
                                  color: '#ededed',
                                  borderRadius: 5,
                                  borderTopLeftRadius: 0,
                                  padding: 5,
                                  paddingTop: 0,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                  marginTop: 30,
                                }}>
                                  <div style={{
                                    position: 'relative',
                                    backgroundColor: 'inherit',
                                    padding: 5,
                                    paddingBottom: 0,
                                    top: -25,
                                    left: -10,
                                    borderTopLeftRadius: 5,
                                    borderTopRightRadius: 5,
                                    maxWidth: 130,
                                  }}>
                                    <Typography variant="body2">
                                      {`Cabin type ${cabinKey.toLowerCase()}`}
                                    </Typography>
                                  </div>
                                  {
                                    objectMap(cabin, (cabinType, cabinTypeKey) => (
                                      <React.Fragment>
                                        {
                                          objectMap(cabinType.products, (cabinTypeProduct) => (
                                            <div style={{
                                              border: '1px solid rgba(1, 1, 1, 0.5)',
                                              borderRadius: 5,
                                              padding: 15,
                                              marginBottom: 10,
                                              backgroundColor: cabinTypeProduct.productSubtype === 'BONUS' ? 'rgba(0, 0, 0, 0.3)' : 'inherit',
                                            }}>
                                              <Typography variant="body2">
                                                {cabinTypeProduct.productName}
                                              </Typography>
                                              <List style={{ padding: 0, margin: 0 }}>
                                                <ListItem style={{ padding: 0, margin: 0 }}>
                                                  <Typography variant="body2">
                                                    {`${cabinTypeProduct.price.totalPrice} ${cabinTypeProduct.price.currency}`}
                                                  </Typography>
                                                </ListItem>
                                                <ListItem style={{ padding: 0, margin: 0 }}>
                                                  <Typography variant="body2">
                                                    {`${cabinTypeProduct.price.points} points`}
                                                  </Typography>
                                                </ListItem>
                                              </List>
                                            </div>
                                          ))
                                        }
                                      </React.Fragment>
                                    ))
                                  }
                                </div>
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Table size="small">
                      <TableBody>
                        {
                          outboundFlight.segments.map((segment) => (
                            <Paper style={{ margin: 10, backgroundColor: 'rgba(1, 1, 1, 0.1' }} elevation={0}>
                              <TableRow>
                                <TableCell style={{ borderBottom: 0, width: 10 }}>
                                  <Tooltip title="Airplane model">
                                    <LocalAirportIcon fontSize="small" />
                                  </Tooltip>
                                </TableCell>
                                <TableCell style={{ borderBottom: 0 }}>
                                  {`${segment.airCraft.name} (${segment.airCraft.code})`}
                                </TableCell>
                                <TableCell style={{ borderBottom: 0 }}>{`${segment.departureAirport.name} ${segment.departureAirport.code} at ${moment(segment.departureDateTimeInLocal).format('hh:mm')}`}</TableCell>
                                <TableCell style={{ borderBottom: 0 }}>
                                  <Tooltip title="To airport">
                                    <FlightTakeoffIcon fontSize="small" />
                                  </Tooltip>
                                </TableCell>
                                <TableCell style={{ borderBottom: 0 }}>{`${segment.arrivalAirport.name} ${segment.arrivalAirport.code} at ${moment(segment.arrivalDateTimeInLocal).format('hh:mm')}`}</TableCell>
                              </TableRow>
                            </Paper>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Paper>
            )))
          )
        }
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: null,
      error: '',
      fromIATA: 'ARN',
      toIATA: 'IAD',
      returnDepartureDate: '20200115',
      startDepartureDate: '20200114',
      adults: 1,
      children: 0,
      infants: 0,
      youth: 0,
      bookingFlow: 'points',
      position: 'se',
    };
  }

  handleSubmit = async () => {
    let url = new URL('https://cors-anywhere.herokuapp.com/https://api.flysas.com/offers/flights');

    const {
      fromIATA,
      toIATA,
      returnDepartureDate,
      startDepartureDate,
      adults,
      children,
      infants,
      youth,
      bookingFlow,
      position,
    } = this.state;

    const params = {
        to: toIATA,
        from: fromIATA,
        outDate: startDepartureDate,
        inDate: returnDepartureDate,
        adt: adults,
        chd: children,
        inf: infants,
        yth: youth,
        bookingFlow,
        pos: position,
        channel: 'web',
        displayType: 'upsell',
    };

    // Append query parameters to url
    Object
      .keys(params)
      .forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, {
      method: 'GET',
      accept: 'application/json',
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data);

        this.setState({ flights: data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      fromIATA,
      toIATA,
      returnDepartureDate,
      startDepartureDate,
      adults,
      children,
      infants,
      youth,
      bookingFlow,
      position,

      flights,
      error,
    } = this.state;

    return (
      <div style={{ padding: 30 }}>
        <TextField
          margin="dense"
          name="fromIATA"
          value={fromIATA}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="From IATA"
          label="From IATA"
        />
        <TextField
          margin="dense"
          name="toIATA"
          value={toIATA}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="To IATA"
          label="To IATA"
        />
        <TextField
          margin="dense"
          name="startDepartureDate"
          value={startDepartureDate}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="Avfärd datum"
          label="Avfärd datum"
        />
        <TextField
          margin="dense"
          name="returnDepartureDate"
          value={returnDepartureDate}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="Returdatum"
          label="Returdatum"
        />
        <TextField
          margin="dense"
          name="adults"
          value={adults}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="Vuxna"
          label="Vuxna"
        />
        <TextField
          margin="dense"
          name="children"
          value={children}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="Barn"
          label="Barn"
        />
        <TextField
          margin="dense"
          name="infants"
          value={infants}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="Spädbarn"
          label="Spädbarn"
        />
        <TextField
          margin="dense"
          name="bookingFlow"
          value={bookingFlow}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="Boka med poäng eller pengar"
          label="Boka med poäng eller pengar"
        />
        <TextField
          margin="dense"
          name="position"
          value={position}
          onChange={this.handleChange}
          variant="outlined"
          placeholder="Position"
          label="Position"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.handleSubmit()}
        >
          Sök flighter
        </Button>
        {
          flights && (
            <>
              <Flights flights={flights.outboundFlights} outbound />
              <Flights flights={flights.inboundFlights} outbound={false} />
            </>
          )
        }
      </div>
    );
  }
}

export default App;

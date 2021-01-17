import { React, useState, Fragment, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import './personal.css';
import URL from '../util/url';
import Typography from '@material-ui/core/Typography';
import { Data } from '../personal/personal';
import { Data1 } from '../personal/personal';
import Button from '@material-ui/core/Button';
import ReadMessagePopup from '../letterpopup/ReadMessagePopup';
import SendMessagePopup from '../letterpopup/SendMessagePopup';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  msgCard: {
    padding: '15px',
    marginTop: '20px',
    backgroundColor: '#FFD94D',
    borderRadius: '15px',
    transition: 'all ease-in-out 0.3s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-2px)',
    },
  },
  msgCard1: {
    padding: '15px',
    marginTop: '20px',
    backgroundColor: '#FFE171',
    borderRadius: '15px',
    transition: 'all ease-in-out 0.3s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'translateY(-2px)',
    },
  },
  Gin: {
    padding: '0 0px 0px 0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: 1,
  },
  Gin1: {
    padding: '0 0px 0px 0px',
    marginRight: '0rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    float: 'right',
    flex: 1,
  },

  Gi: {
    flex: 1,
  },
  date: {
    margin: '.8rem 0rem 0 0',
    fontFamily: 'oxygen',
    fontSize: '0.7rem',
  },
  date1: {
    margin: '.8rem 0rem 0 0',
    fontFamily: 'oxygen',
    fontSize: '0.94rem',
    fontWeight:'bold',
  },
  krait: {
    marginLeft: '7px',
  },
  bitsId: {
    fontSize: '12px',
    fontFamily: 'Oxygen, sans-serif',
    fontWeight: 700,
    padding: 0,
    marginTop: '10px',
  },
  '@media(min-width: 780px)': {
    bitsId: {
      fontSize: '18px',
      fontFamily: 'Oxygen, sans-serif',
      fontWeight: 700,
      padding: 0,
      marginTop: '10px',
    },
    date: {
      margin: '.8rem 0rem 0 0',
      fontFamily: 'oxygen',
      fontSize: '0.9rem',
    },
    date1: {
      margin: '.8rem 0rem 0 0',
      fontFamily: 'oxygen',
      fontSize: '1.1rem',
      fontWeight:'bold',
    },
  },
  '@media(max-height: 680px)': {
    Gin: {
      fontSize: '20px',
    },
    Gin1: {},
  },
  '@media(max-height: 568px)': {
    Gin: {
      fontSize: '20px',
    },
    Gin1: {},
  },
  '@media(max-height: 750px)': {
    Gin: {
      fontSize: '20px',
    },
    Gin1: {},
  },
}));

export default function PersonalCards({ text, index,fix,setGet }) {
  const classes = useStyles();
  const { get } = useContext(Data);
  const i = useContext(Data1);
  const dateFormatter = (timestamp) => {
    var date = new Date(timestamp);
    var day =
      date.getDate() == 1
        ? date.getDate() + 'st  '
        : date.getDate() == 2
        ? date.getDate() + 'nd  '
        : date.getDate() == 3
        ? date.getDate() + 'rd  '
        : date.getDate() == 21
        ? date.getDate() + 'st  '
        : date.getDate() == 22
        ? date.getDate() + 'nd  '
        : date.getDate() == 23
        ? date.getDate() + 'rd  '
        : date.getDate() + 'th ';
    var month = date.toLocaleString('default', { month: 'short' }) + ' ';
    var year = date.getFullYear() + ', ';
    var time = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return day + month + year + time;
  };
  const [pos, setpos] = useState(0);
  const [vat, setvat] = useState(false);
  //const [read,setRead] = useState(1);
  const handler1=()=>{
    async function postRead() {
      try {
        console.log(get);
        const response = await (
          await fetch(`${URL}/api/level0/markasread`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              token: `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ id:get[pos]._id }),
          })
        ).json();
        if (response.ok) {
            //setRead(response);
            console.log(response);
        } 
      } catch (error) {
        console.error(error.message);
      }

      try {
        let response = await axios.get(`${URL}/api/level0/receivedmessages`, {
          method: 'GET',
          headers: { token: `${localStorage.getItem('token')}` },
        });
        var r = await response.data.data;
        //setload(false);
        //console.log(response);
        setGet([...r].reverse());
      } catch (error) {
        console.error(error.message);
      }
    }
    postRead();
  };
  const toggleReadMessages = (b) => {
    setvat(b);
  };
  if(fix==0){
  return (
    <Fragment>
      <ReadMessagePopup
        messageArray={get.map((obj) => {
          return [obj.body, obj.date];
        })}
        startFrom={pos}
        enabled={vat}
        toggleVisibility={toggleReadMessages}
        key={'ReadMessagePopupKey-' + vat}
      />
      {Array.isArray(get) && get.length !== 0 ? (
        get
          .slice(i, i + 15 <= get.length ? i + 15 : get.length)
          .map((text, index) => (
            <Card
              className={(text.read==1)?classes.msgCard:classes.msgCard1}
              raised={true}
              key={(i / 15) * 15 + index}
              onClick={() => {
                toggleReadMessages(true);
                setpos((i / 15) * 15 + index);
                handler1();
              }}
            >
              <div className={classes.bitsId}>
                
              </div>
              <div className={classes.Gin}>
                <p className={(text.read==1)?classes.date:classes.date1}>
                  {screen.width >= 591
                    ? screen.width >= 680
                      ? text.body.slice(0, 43)
                      : text.body.slice(0, 31)
                    : text.body.slice(0, 23)}
                </p>
              </div>

              <div className={classes.Gin1}>
                <Typography variant="h6" edge="start">
                  <b key="index">
                    <p className={classes.date}>
                      {screen.width >= 591
                        ? screen.width >= 680
                          ? dateFormatter(text.date).slice(0, 23)
                          : dateFormatter(text.date).slice(0, 23)
                        : dateFormatter(text.date).slice(0, 23)}
                    </p>
                  </b>
                </Typography>
              </div>
            </Card>
          ))
      ) : (
        <h1 className="baxter">No Messages to Display !</h1>
      )}
    </Fragment>
  );
      }
  else{  return (
    <Fragment>
      <ReadMessagePopup
        messageArray={get.map((obj) => {
          return [obj.body, obj.date];
        })}
        startFrom={pos}
        enabled={vat}
        toggleVisibility={toggleReadMessages}
        key={'ReadMessagePopupKey-' + vat}
      />
      {Array.isArray(get) && get.length !== 0 ? (
        get
          .slice(i, i + 15 <= get.length ? i + 15 : get.length)
          .map((text, index) => (
            <Card
              className={classes.msgCard}
              raised={true}
              key={index}
              onClick={() => {
                toggleReadMessages(true);
                setpos((i / 15) * 15 + index);
                //handler1();
              }}
            >
              <div className={classes.bitsId}>
                To {text.receiverEmail}
              </div>
              <div className={classes.Gin}>
                <p className={classes.date}>
                  {screen.width >= 591
                    ? screen.width >= 680
                      ? text.body.slice(0, 43)
                      : text.body.slice(0, 31)
                    : text.body.slice(0, 23)}
                </p>
              </div>

              <div className={classes.Gin1}>
                <Typography variant="h6" edge="start">
                  <b key="index">
                    <p className={classes.date}>
                      {screen.width >= 591
                        ? screen.width >= 680
                          ? dateFormatter(text.date).slice(0, 23)
                          : dateFormatter(text.date).slice(0, 23)
                        : dateFormatter(text.date).slice(0, 23)}
                    </p>
                  </b>
                </Typography>
              </div>
            </Card>
          ))
      ) : (
        <h1 className="baxter">No Messages to Display !</h1>
      )}
    </Fragment>
  );
  }
}

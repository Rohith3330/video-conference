import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router-dom';
import socket from '../../socket';



function generateRandomString() {
  let randomString = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    if(i===3){
        randomString+='-';
    }
    randomString += characters[randomIndex];
  }

  return randomString;
}

const Createmeet = (props) => {
//   const roomRef = useRef();
    const [roomname,setroomname]=useState(generateRandomString());
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    // setroomname(generateRandomString())
    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomname;
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);
  
   function clickJoin() {
    setroomname(generateRandomString());
    const roomName = roomname;
    const userName = userRef.current.value;

    if (!userName) {
      setErr(true);
      setErrMsg('Enter User Name');
    }
    else if(!roomname){
        setErr(true);
        setErrMsg('Enter Room Name ');
    } 
    else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <MainContainer>
      {/* <Row>
        <Label htmlFor="roomName">Room ID</Label>
        <Input type="text" id="roomName" ref={roomRef} />
      </Row> */}
      <Row>
        <Label htmlFor="userName">User Name</Label>
        <Input type="text" id="userName" ref={userRef} />
      </Row>
      <JoinButton onClick={clickJoin}> Create </JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
      
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 150px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default Createmeet;

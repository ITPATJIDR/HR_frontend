import { NextPage } from "next"
import { Button, Input, Grid, Container, Row, Col, Card, Text, Spacer } from '@nextui-org/react';
import { setAuthState, selectAuthState, authAction } from "../store/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

const INITIALSTATE = {
    username:"",
    password:""
}

const loginPage:NextPage = () =>{

  const [credentials, setCredentials] = useState(INITIALSTATE)
  const [error, setError] = useState("")
	const dispatch = useDispatch();
	const authState = useSelector(selectAuthState)

  const handleSubmit = async () =>{
    const {status,response} = await authAction(credentials) 
    if (status == 200){
      dispatch(setAuthState(true))
    }else{
      setError(response?.data.msg)
    }
  }

  const { username , password } = credentials 

  const handleChange = (e:any) =>{
    const {name,value} = e.target
    setCredentials({...credentials,[name]:value})
  }


	return (
        <div>
          <Spacer y={8} />
          <Container xs>
            <Card css={{ h: "400px" }}>
              <Spacer y={1} />
              <Card.Header css={{ justifyContent: "center", display: "flex" }}>
                <Text h2 size={30} weight="bold" css={{ textGradient: "45deg, $purple600 -20%, $pink600 100%", }}>
                  HR SYSTEM
                </Text>
              </Card.Header>
              <Card.Body>
                <Spacer y={0.5} />
                <Row justify="center" align="center">
                  <Col>
                    <Input width="550px" name="username" css={{ ml: 12 }} value={username} onChange={handleChange} labelPlaceholder="Username" />
                  </Col>
                </Row>
                <Spacer y={2} />
                <Row>
                  <Col>
                    <Input.Password width="550px" name="password" css={{ ml: 12 }} value={password} onChange={handleChange} labelPlaceholder="Password" />
                  </Col>
                </Row>
                {error 
                ?
                <>
                  <Spacer y={1} />
                    <Row>
                      <Col css={{ display: "flex", justifyContent: "center" }}>
                        <Text h5 color="error">{error}</Text>
                      </Col>
                    </Row> 
                </>
                : 
                <Spacer y={2} />
                }
                <Row>
                  <Col css={{ display: "flex", justifyContent: "center" }}>
                    <Button color="gradient" size="lg" onPress={() => handleSubmit()}>Login</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
	)
}

export default loginPage
import { Card, Text, Button, Table, Loading, User } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next';
import ModalMain from "../modalMain"
import axios from 'axios';
import CreateDepartmentModalBody from '../modals/createDepartmentBody';
import CreateDepartmentModalFooter from "../modals/createDepartmentFooter" 
import ShowEmployee from '../modals/showEmployee';
import { departmentType, employeeType } from '../../Types';

const DepartmentPage: NextPage = () => {

	const [modalMain, setModalMain] = useState(false);
	const [modalShowEmployee, setShowEmployee] = useState(false);
	const [employeeList, setEmployeeList] = useState<employeeType[]>([]);
	const [department, setDepartment] = useState("");
	const [departmentList, setDepartmentList] = useState<departmentType[]>([])
	const [error, setError] = useState("");
	const API = process.env.localhost


	const columns = [
		{name:"DEPARTMENT",uid:"Department"},
		{name:"EMPLOYEE",uid:"Employee"},
		{name:"MEMBER",uid:"Member"},
		{name:"LEADER",uid:"Leader"},
		{name:"SENIOR",uid:"Senior"},
		{name:"JUNIOR",uid:"Junior"},
		{name:"ACTIONS",uid:"Actions"},
	]

	const RenderTable = (departmentList:any,columnKey:React.Key) => {
		const cell = departmentList[columnKey]
		const employees = departmentList.employees
		const leader = employees.filter((item:any) => item.position === "LEADER")
		const senior = employees.filter((item:any) => item.position === "SENIOR")
		const junior = employees.filter((item:any) => item.position === "JUNIOR")
		const leaderPicture = leader[0]?.picture
		const countSenior = senior.length
		const countJunior = junior.length


		switch (columnKey) {
			case "Department":
				return (
					<Text h6 weight="bold">{departmentList.departmentName}</Text>
				)
			case "Employee":
				return(
					<div style={{display:"flex",justifyContent: "center"}}>
						{employees 
						? employees.map((item:any, key:any) =>{
							return(
								<User key={key} name="" size="md" color="primary" css={{padding:0}}  src={item.picture}/>
							)
						})
						: null
						}
					</div>
				)
			case "Leader":
				return(
					<div style={{display:"flex",justifyContent: "center",paddingLeft:20}}>
						{leaderPicture
							? <User name="" size="md" color="primary" css={{ padding: 0 }} src={leaderPicture} />
							: <Text b>Empty</Text>  
						}
					</div>

				)
			case "Member":
				return(
					<div style={{display:"flex",justifyContent: "center"}}>
						<Text h6 weight="bold">{employees.length}</Text>
					</div>
				)
			case "Senior":
				return(
					<div style={{display:"flex",justifyContent: "center"}}>
						{senior?
							<Text h6 weight="bold">{countSenior}</Text>
						:null}
					</div>
				)
			case "Junior":
				return(
					<div style={{display:"flex",justifyContent: "center"}}>
						{junior?
							<Text h6 weight="bold">{countJunior}</Text>
						:null}
					</div>
				)
			case "Actions":
				return(
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Button css={{ marginRight: "15px" }} auto color="primary" onPress={() => handlerModalShowEmployee(employees)} icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} />
						<Button auto color="error" icon={<FontAwesomeIcon icon={faTrash} />} />
					</div>
				)
			default:
				return cell
		}
	}

	const handlerModal = () => setModalMain(true);
	const handlerModalShowEmployee = (employees:employeeType) =>{
		setShowEmployee(true);
		setEmployeeList([...employeeList, employees]);
	}


	const handlerChange = (e: any) => {
		const value = e.target.value
		setDepartment(value)
	}

	const closeHandler = () => {
		setModalMain(false);
	};
	const closeHandlerShowEmployee = () => {
		setShowEmployee(false);
	};


	const handlerSubmit = async () => {
		if (department) {
			await axios.post(`${API}/department/createDepartment`
				, { departmentName: department })
				.then((res) => {
					setModalMain(false)
					setDepartment("")
					setError("")
				})
				.catch((err) => {
					const { msg } = err.response.data
					setDepartment("")
					setError(msg)
				})
		}
	}

	useEffect(() => {
		const getAllDepartments = async () => {
			await axios.get(`${API}/department/getAllDepartments`, {
				withCredentials: true
			})
				.then((res) => {
					setDepartmentList(res.data.departments)
				})
				.catch((err) => (err))
		}
		getAllDepartments()
	},[department])


	return (
		<Card css={{ height: '100%' }}>
			<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
				<Text b weight="bold" css={{ marginLeft: 10 }} size={30} color="secondary" >
					Departments
				</Text>
				<Button color="success" css={{ marginRight: 10 }} onPress={handlerModal}>
					Create Departments
				</Button>
			</Card.Header>
			<Card.Divider />
			<Card.Body>
				{departmentList
					?  <Table
						aria-label="Example table with static content"
						css={{
							minHeight: "100%",
							minWidth: "100%",
						}}
					>
						<Table.Header columns={columns}>
							<Table.Column key={"Department"} >Department Name</Table.Column>
							<Table.Column key={"Employee"} align="center">Employee</Table.Column>
							<Table.Column key={"Member"} align="center">Member</Table.Column>
							<Table.Column key={"Leader"} align="center">Leader</Table.Column>
							<Table.Column key={"Senior"} align="center">Senior</Table.Column>
							<Table.Column key={"Junior"} align="center">Junior</Table.Column>
							<Table.Column key={"Actions"} align="center">Actions</Table.Column>
						</Table.Header>
						<Table.Body items={departmentList}>
							{(item:departmentType) => (
								<Table.Row>
									{(columnKey) => (
										<Table.Cell>{RenderTable(item, columnKey)}</Table.Cell>
									)}
								</Table.Row>	
							)}
						</Table.Body>
					</Table>
					: <Loading/>}
			</Card.Body>
			<ModalMain body={<CreateDepartmentModalBody department={department} handlerChange={handlerChange} />}
				footer={<CreateDepartmentModalFooter handlerSubmit={handlerSubmit} error={error} />}
				trigger={modalMain} handleClose={closeHandler}
				nameFirst={"Create a new"} nameLast={"Department"} width={"400px"} />
			<ModalMain body={<ShowEmployee employeeList={employeeList} />}
				trigger={modalShowEmployee} handleClose={closeHandlerShowEmployee}
				nameFirst={"Show a "} nameLast={"Employee"} width={"800px"} />
			
		</Card>
	)
}

export default DepartmentPage
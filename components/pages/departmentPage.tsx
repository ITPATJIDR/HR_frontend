import { Card, Text, Button, Table, Loading, User } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next';
import ModalMain from "../modalMain"
import axios from 'axios';
import CreateDepartmentModalBody from '../modals/createDepartmentBody';
import CreateDepartmentModalFooter from "../modals/createDepartmentFooter" 
import { departmentType } from '../../Types';

const DepartmentPage: NextPage = () => {

	const [visible, setVisible] = useState(false);
	const [department, setDepartment] = useState("");
	const [departmentList, setDepartmentList] = useState()
	const [error, setError] = useState("");
	const API = process.env.localhost

	const columns = [
		{name:"DEPARTMENT",uid:"Department"},
		{name:"EMPLOYEE",uid:"Employee"},
		{name:"ACTIONS",uid:"Actions"},
	]

	const RenderTable = (departmentList:any,columnKey:React.Key) => {
		const cell = departmentList[columnKey]
		const employees = departmentList.employees
		switch (columnKey) {
			case "Department":
				return (
					<Text h6 weight="bold">{departmentList.departmentName}</Text>
				)
			case "Employee":
				return(
					<div style={{display:"flex",justifyContent: "center"}}>
						{employees.map((item:any, key:any) =>{
							return(
								<User key={key} name="" size="md" color="primary" css={{padding:0}}  src={item.picture}/>
							)
						})}
					</div>
				)
			case "Actions":
				return(
					<div style={{display:"flex",justifyContent:"center"}}>
						<Button css={{marginRight:"15px"}} auto color="primary" icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}/>
						<Button auto color="error" icon={<FontAwesomeIcon icon={faTrash} />}/>
					</div>
				)
			default:
				return cell
		}
	}

	const handlerModal = () => setVisible(true);

	const handlerChange = (e: any) => {
		const value = e.target.value
		setDepartment(value)
	}

	const closeHandler = () => {
		setVisible(false);
	};

	const handlerSubmit = async () => {
		if (department) {
			await axios.post(`${API}/department/createDepartment`
				, { departmentName: department })
				.then((res) => {
					setVisible(false)
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
			{visible
				? <ModalMain body={<CreateDepartmentModalBody department={department} handlerChange={handlerChange} />}
					footer={<CreateDepartmentModalFooter handlerSubmit={handlerSubmit} error={error} />}
					trigger={visible} handleClose={closeHandler}
					nameFirst={"Create a new"} nameLast={"Department"} />
				: null}
		</Card>
	)
}

export default DepartmentPage
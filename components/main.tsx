import React, { FunctionComponent } from 'react';
import { Button, Container, Row, Col, Spacer } from '@nextui-org/react';
import Navbar from './Navbar';
import { useState } from "react"
import { ReactPage } from "../Types"
import { faBuildingUser, faPerson, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DepartmentPage from './pages/departmentPage';
import EmployeePage from './pages/employeePage';
import PayrollPage from './pages/payrollPage';


const main: FunctionComponent<ReactPage> = ({ children }) => {

	const [page, setPage] = useState(0)

	const RenderPage = () => {
		if (page == 0) {
			return <DepartmentPage/>
		} else if (page == 1) {
			return <EmployeePage/>
		} else if (page == 2) {
			return <PayrollPage/>
		} else {
			return <DepartmentPage/>
		}
	}

	return (
		<>
			<Navbar />
			<Container fluid display="flex" css={{ padding: 0}}>
				<Row css={{ padding: 0}}>
					<Col span={2} css={{ width: "240px", height: "920px", padding: 10, backgroundColor: "#024959" }}>
						<Spacer y={0.5} />
						<Button icon={<FontAwesomeIcon icon={faBuildingUser} />} onPress={() => setPage(0)} css={{ backgroundColor: "#012E40" }}>
							Departments
						</Button>
						<Spacer y={0.5} />
						<Button icon={<FontAwesomeIcon icon={faPerson} />} onPress={() => setPage(1)} css={{ backgroundColor: "#012E40" }}>
							Employee
						</Button>
						<Spacer y={0.5} />
						<Button icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />} onPress={() => setPage(2)} css={{ backgroundColor: "#012E40" }}>
							Payroll
						</Button>
					</Col>
					<Col css={{ p: 20, h: "895px"}}>
						<RenderPage/>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default main 
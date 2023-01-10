import React, { FunctionComponent } from 'react';
import { Button, Container, Row, Col, Spacer } from '@nextui-org/react';
import Navbar from './Navbar';
import { ReactPage } from "../Types"
import { faBuildingUser, faPerson, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux';
import { setPageState, selectPageState  } from '../store/pageSlice';
import DepartmentPage from './pages/departmentPage';
import EmployeePage from './pages/employeePage';
import PayrollPage from './pages/payrollPage';


const main: FunctionComponent<ReactPage> = ({ children }) => {

	const pageState = useSelector(selectPageState)
	const dispatch = useDispatch()

	const handlerSetPage = (index: number) => dispatch(setPageState(index))

	const RenderPage = () => {
		if (pageState == 0) {
			return <DepartmentPage/>
		} else if (pageState == 1) {
			return <EmployeePage/>
		} else if (pageState == 2) {
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
						<Button icon={<FontAwesomeIcon icon={faBuildingUser} />} onPress={() => handlerSetPage(0)} css={{ backgroundColor: "#012E40" }}>
							Departments
						</Button>
						<Spacer y={0.5} />
						<Button icon={<FontAwesomeIcon icon={faPerson} />} onPress={() => handlerSetPage(1)} css={{ backgroundColor: "#012E40" }}>
							Employee
						</Button>
						<Spacer y={0.5} />
						<Button icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />} onPress={() => handlerSetPage(2)} css={{ backgroundColor: "#012E40" }}>
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
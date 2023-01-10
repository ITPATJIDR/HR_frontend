import React, {FC} from "react"
import { Table } from "@nextui-org/react";
import { employeeListType, employeeType } from "../../Types"
import { NextPage } from "next";

const columns = [
	{name:"IDCard", uid:"IDcard"},
	{name:"Email", uid:"email"},
	{name:"FirstName", uid:"firstName"},
	{name:"LastName", uid:"lastName"},
	{name:"Position", uid:"position"},
	{name:"PhoneNumber", uid:"phoneNumber"},
	{name:"Salary", uid:"salaryBase"},
]


const ShowEmployee:NextPage<employeeListType> = ({employeeList}) =>{
	return(
		<Table 
			aria-label="Example table with static content"
			css={{
				minHeight: "100%",
				minWidth: "100%",
			}}
		>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column key={column.uid}>{column.name}</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={employeeList[0]}>
				{(item: employeeType) => (
					<Table.Row>
						{(columnKey) => (
							<Table.Cell>{item[columnKey]}</Table.Cell>
						)}
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	)

}

export default ShowEmployee
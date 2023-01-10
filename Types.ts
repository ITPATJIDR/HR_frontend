import React from 'react';
import EmployeePage from './components/pages/employeePage';

export interface ReactPage{
	children?: React.ReactNode
}

export interface ModalPage{
	body?: React.ReactNode
	footer?: React.ReactNode
	trigger: boolean
	handleClose: () => any
	nameFirst: string
	nameLast: string
  width:string
}

export interface Status{
	status: boolean
}

export interface departmentType {
  id: number;
  departmentName: string;
  employees: employeeType[];
}

export interface employeeListType{
  employeeList: employeeType[]
}

export interface employeeType {
  [Symbol.iterator]: () => Iterator<employeeType>;
  [key: string]: any;
  IDcard: string;
  address: string;
  age: number;
  bankAccount: string;
  backName: string;
  child: number;
  createAt: Date;
  departmentId: number;
  email: string;
  emergencyPhone: string;
  employeeType: string;
  endAt: Date | undefined;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  picture: string;
  position: string;
  relationship: string;
  salaryBase: number;
  typeofPay: string;
}


export interface UserType{
	id: number,
	username: string
}

export interface ActionKeyType{
	actionKey:Object;
}
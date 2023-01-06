import React from 'react';

export interface ReactPage{
	children?: React.ReactNode
}

export interface ModalPage{
	body?: React.ReactNode
	footer?: React.ReactNode
	trigger: boolean
	handleClose: () => any
	nameFirst: String
	nameLast: String
}

export interface Status{
	status: boolean
}

export interface departmentType {
	id: number,
	departmentName: string
	employees: []
}
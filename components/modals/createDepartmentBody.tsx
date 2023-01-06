import {Input} from '@nextui-org/react';

const CreateDepartmentBody = ({ department, handlerChange }: any) => {
	return (
		<Input aria-labelledby="department" placeholder="Department Name" value={department} onChange={handlerChange} />
	)
}

export default CreateDepartmentBody 
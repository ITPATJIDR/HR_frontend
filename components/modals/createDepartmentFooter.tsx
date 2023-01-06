import {Input, Text, Button} from '@nextui-org/react';

const CreateDepartmentFooter = ({ handlerSubmit, error }: any) => {
	return (
		<>
			{error ? <Text h6 color="error">{error}</Text> : null}
			<Button auto color="success" onPress={handlerSubmit}>Create</Button>
		</>
	)
}

export default CreateDepartmentFooter
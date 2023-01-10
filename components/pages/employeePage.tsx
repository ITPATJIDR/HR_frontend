import { Button, Text } from "@nextui-org/react"
import { useDispatch } from "react-redux"
import { setPageState } from "../../store/pageSlice"
const EmployeePage = () =>{
	const dispatch = useDispatch()
	return(
		<div>
			<Text>
				Employee Page	
			</Text>
			<Button onPress={() => dispatch(setPageState(3))}>test</Button>
		</div>
	)
}

export default EmployeePage 
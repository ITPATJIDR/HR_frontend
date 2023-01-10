import React ,{ useEffect,useState } from "react";
import { Navbar, Text,Avatar, Link, Button, Dropdown } from "@nextui-org/react";
import { getUser, logOut, setAuthState } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { NextPage } from "next";
import { UserType, ActionKeyType } from "../Types";

const Bar: NextPage = () => {

	const [user, setUser] = useState<UserType>()
	const dispatch = useDispatch()

	useEffect(() =>{
		const fetchUser = async () =>{
			const res = await getUser()
			setUser(res.data)
		}
		fetchUser()
	},[])

	const handlerDropdown = ({actionKey}:ActionKeyType) =>{
		switch(actionKey){
			case "logout":
				logOut()
				dispatch(setAuthState(false))
			default:
				null
		}
	}


	return (
		<Navbar height={50} maxWidth="fluid">
			<Navbar.Brand css={{ paddingLeft: 35 }}>
				<Text b size={35} weight="bold" css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>
					HRMS
				</Text>
			</Navbar.Brand>
			<Navbar.Content>
				<Dropdown placement="bottom-right">
					<Navbar.Item>
						<Dropdown.Trigger>
							<Avatar
								bordered
								as="button"
								color="warning"
								size="md"
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							/>
						</Dropdown.Trigger>
					</Navbar.Item>
					<Dropdown.Menu
						aria-label="User menu actions"
						color="warning"
						onAction={(actionKey) => handlerDropdown({ actionKey })}
					>
						<Dropdown.Item key="profile" css={{ height: "$18" }}>
							<Text b color="inherit" css={{ d: "flex" }}>
								Signed in as
							</Text>
							<Text b size={20} weight="bold" color="inherit" css={{ d: "flex", textGradient: "45deg, $blue600 -20%, $pink600 50%"  }}>
								{user?.username}
							</Text>
						</Dropdown.Item>
						<Dropdown.Item key="Profile" withDivider>
							<Text b>
								Profile
							</Text>
						</Dropdown.Item>
						<Dropdown.Item key="Setting" withDivider>
							<Text b>
								Setting	
							</Text>
						</Dropdown.Item>
						<Dropdown.Item key="logout" withDivider color="error">
							Log Out
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Navbar.Content>
		</Navbar>
	)
}

export default Bar 
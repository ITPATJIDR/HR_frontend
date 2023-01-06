import { Navbar, Text, Link, Button } from "@nextui-org/react";
import { NextPage } from "next";
// #012E40; 
// #024959; 
// #026773; 
// #3CA6A6; 
// #F2E3D5; 

const Bar: NextPage = () => {
	return (
		<Navbar height={50} maxWidth="fluid">
			<Navbar.Brand css={{ paddingLeft: 35 }}>
				<Text b size={35} weight="bold" css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>
					HRMS
				</Text>
			</Navbar.Brand>
			<Navbar.Content>
				<Navbar.Link color="inherit" href="#">
					Login
				</Navbar.Link>
				<Navbar.Item>
					<Button auto flat as={Link} href="#">
						Sign Up
					</Button>
				</Navbar.Item>
			</Navbar.Content>
		</Navbar>
	)
}

export default Bar 
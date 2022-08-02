import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  let username = useRef();
  let phone = useRef();
  let email = useRef();
  let password = useRef();
  const [role, setRole] = useState(null)
  const navigate = useNavigate();
  const handleRegister = () => {
    if(role){

      const payload = {
        username: username.current.value,
        phone: phone.current.value,
        email: email.current.value,
        password: password.current.value,
        role:role
      };
      try {
        axios({
          url: "http://localhost:8080/register",
          method: "POST",
          data: payload,
        }).then((res)=>{
          navigate("/login", { replace: true });
        })

      } catch (err) {
        console.log(err);
      }
    }else{
      const payload = {
        username: username.current.value,
        phone: phone.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        axios({
          url: "http://localhost:8080/register",
          method: "POST",
          data: payload,
        });
      } catch (err) {
        console.log(err);
      }
    }

   
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Register
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          w="30rem"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" ref={username} />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input type="number" ref={phone} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" ref={email} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  ref={password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Select placeholder="Select Role" onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </Select>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.700",
                }}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link to='/login' > <span style={{color:"red"}}>Login</span> </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

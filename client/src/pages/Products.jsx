import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios"
import { AddProducts } from "../components/AddProducts";


const Products = () => {
  const token= sessionStorage.getItem("userToken");


  let [products, setProducts]= useState([])

  useEffect(() =>{
    try {
      axios({
        url: "http://localhost:8080/products",
        method: "get",
      }).then((res)=>{
        console.log(res.data,"products")
        setProducts(res.data);
      })
    } catch (err) {
      console.log(err)
    }
  },[])
  const role= sessionStorage.getItem("userRole");
  const handleDelete=(id)=>{
    if(role==="admin" || role==="manager"){

      axios({
        url: `http://localhost:8080/products/${id}`,
        method: "delete",
      }).then((res)=>{
        axios({
          url: "http://localhost:8080/products",
          method: "get",
        }).then((res)=>{
          console.log(res.data,"products")
          setProducts(res.data);
        })
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      alert('only admin and manager can delete a product')
    }
}
  return (
    <Box>
      <Flex>
        <AddProducts/>
      </Flex>
      <Flex h='3rem' align='center' color='white'px='10' bg='red.400' justify='space-between'>
        <Text fontSize='32px' fontweight='700'>Product List</Text>
        <Text w='30%' noOfLines={1} color='white'> <span style={{color:'black'}}>TOKEN:</span>{token}</Text>
        <Text><span style={{color:'black'}}>Total:</span> {products?.length}</Text>
      </Flex>
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th >Price</Th>
            <Th >Description</Th>
            <Th >Edit</Th>
            <Th >Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
              products?.map((elem,index)=>{
                  return(
                      <Tr key= {elem._id} >
                          <Td>{++index}</Td>
                          <Td>{elem.name}</Td>
                          <Td>₹{elem.price}</Td>
                          <Td ><Text noOfLines={1}>{elem.description}</Text></Td>
                          <Td><Button colorScheme='facebook'>Edit</Button></Td>
                          <Td><Button  colorScheme='red' onClick={()=>{handleDelete(elem._id)}}>Delete</Button ></Td>
                      </Tr>
                  )
              })
          }
        </Tbody>
      </Table>
    </TableContainer>

  </Box>
  );
}

export default Products
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box
  } from '@chakra-ui/react'
import { useRef } from 'react'
import axios from 'axios'

export function AddProducts() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const role= sessionStorage.getItem("userRole");
   const name= useRef()
   const price= useRef()
   const description= useRef()



    const handleProducts=()=>{
      if(role==="admin"){

        const payload=   {
               name:name.current.value,
               price: price.current.value,
               description: description.current.value,
           }
           try {
             axios({
               url: "http://localhost:8080/products",
               method: "POST",
               data: payload,
             }).then((res)=>{
               onClose()
               axios({
                 url: "http://localhost:8080/products",
                 method: "GET",
               }).catch((err)=>{
                 console.log(err)
               })
             })
           } catch (err) {
             console.log(err)
           }
      }else{
        alert("Only Admin can add a product")
      }

    }
    return (
      < >
        <Button onClick={onOpen} bg="red.400" color='white' m='10'>Add Products</Button>
       
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Products</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormLabel>Name</FormLabel>
                <Input  placeholder='Name' type='text' ref={name}/>
                <FormLabel>Price</FormLabel>
                <Input  placeholder='Price' type="number" ref={price}/>
                <FormLabel>Description</FormLabel>
                <Input type='text' placeholder='Description' ref={description}/>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleProducts}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
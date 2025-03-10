'use client'
import {Box, Stack, Typography, Button, Modal, TextField} from "@mui/material"
import { initializeApp } from "firebase/app";
import { firestore } from "../firebase";
import { app } from "../firebase";
import { collection, setDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import {firebaseConfig} from "../firebase"; 
import { query, getDocs } from "firebase/firestore";
// import { collection, getFirestore , query} from "firebase/firestore"; 
import { useEffect, useState } from "react";

// const item = ['tomato', 'potato', 'onion', 'Garlic','Ginger', 'papaya', 'Mayonaise', 'laalpoweder', 'Gulabjamun']; //Althougn javascript uses ASI(Automatic Semicolon insertion) it is good practice to place ; at the end of statment. 
// const app = initializeApp(firebaesConfig); 
// const firestore = getFirestore(app); 
// const firesro
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex', 
  flexDirection: 'column', 
  gap:3, 
};
export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName]  = useState('')
  const updatePantry = async() => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
        
      pantryList.push({name:doc.id, ...doc.data()})
    })  
    // console.log(doc.id)
    setPantry(pantryList)
  }
  useEffect( () => { 
    
    updatePantry()
  }, [])

  const addItem = async (item) => {
    // console.log(item)
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) { 
      const {count} = docSnap.data()
      await setDoc(docRef, {count:count+1},{merge:true})
      
    }else{
      await setDoc(docRef, {count:1})
      
    }
    await updatePantry()
  }
 
  const removeItem = async (item) => { 
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){ 
      const {count} =  docSnap.data()
      if(count==1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {count:count-1})
      }
    }
    await updatePantry()
  }
  return (
    <Box height="100vh" widht="100vw" display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={2}>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" >
          Add Item
        </Typography>
        <Stack width="100%" spacing={3} direction={'row'}>
        <TextField id="outlined-basic" label="Item" variant="outlined" fullWidth value={itemName} onChange={(e)=>setItemName(e.target.value )}/>
        <Button variant="outlined" onClick={()=>{
          addItem(itemName)
          setItemName('')
          handleClose
        }} > Add</Button>
        </Stack>
        
      </Box>
    </Modal>
    <Button variant="contained" onClick={handleOpen}>Add</Button>
    <Box border={'1px solid #333'}>
    
      <Box width="800px" height="100px " bgcolor={'#ADD8E6'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'h2'} color={'#333'} textAlign={'center'} >
          Pantry Items
        </Typography>
        
      </Box>


      <Stack height="300px" width="800px" spacing={2} overflow="auto" >
        {pantry.map(({name, count}) =>(
          <Box
          key = {name}
          width = "100%"
          minHeight = "150px"
          display = {'flex'}
          // justifyContent={'center'}
          // alignContent={'center'}
          justifyContent = {"space-between"}
          alignItems={'center'}
          bgcolor={'#f0f0f0'} 
          paddingX = {2}
          >
            <Typography variant={'h3'} color={'#333'} textAlign={'center'} fontWeight={''}>
              {
                //we must make the first letter of a javascript string as capital and remaining asusual. 
                name.charAt(0).toUpperCase() + name.slice(1)

              }
            
            </Typography>
            <Typography textAlign={'center'} color={'#333'} variant="h3">
              quantity: {count}
            </Typography>
            <Button onClick={()=> removeItem(name)} variant="contained">Delete</Button>

          </Box>
        ))}
      </Stack>
    </Box>
    
    
    </Box>
    
    
  );
}

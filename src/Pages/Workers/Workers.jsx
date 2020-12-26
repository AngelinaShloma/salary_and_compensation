import React, {useEffect, useState} from 'react';
import './Workers.css';
import axios from 'axios';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Add, Edit} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import Header from '../../Header'

const Workers = () => {

  const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

  const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsert, setModalInsert]=useState(false);
  const [modalEdit, setModalEdit]=useState(false);
  const [modalAdd, setModalAdd]=useState(false);

  const [worker, setWorker]=useState({
    last_name: '',
    first_name: '',
    patronimic_name: '',
    e_mail: ''
  })

  const queryGet=async()=>{
    try{
    await axios.get("https://vb6th073kf.execute-api.us-east-1.amazonaws.com/dev/accountants/1/workers")
    .then(response=>{
      if(response.data === "Нет работников"){
        alert("Нет работников")
      } else {
      setData(response.data)
      }
    })
  } catch(err){
    alert(err)
  }
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setWorker(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(worker);
  }

  const queryPost=async()=>{
    try{
    await axios.post("https://vb6th073kf.execute-api.us-east-1.amazonaws.com/dev/accountants/1/workers", worker)
    .then(response=>{
      if (response.data === "Такой работник уже существует"){
        alert("Такой работник уже существует")
        ModalWindowInsert()
      } else {
      setData(data.concat(response.data))
      ModalWindowInsert()
      }
    })
  } catch(err){
    alert(err)
  }
  }

  const queryPut=async()=>{
    try{
    await axios.put("https://vb6th073kf.execute-api.us-east-1.amazonaws.com/dev/accountants/1/workers/"+worker.worker_id, worker)
    .then(response=>{
      if (response.data === "Не удалось обновить запись о сотруднике"){
        alert("Не удалось обновить запись о сотруднике")
        ModalWindowEdit();
      } else {
      var dataNew=data;
      dataNew.map(item=>{
        if(worker.worker_id===item.worker_id){
          item.last_name=worker.last_name;
          item.first_name=worker.first_name;
          item.patronimic_name=worker.patronimic_name;
          item.e_mail=worker.e_mail;
        }
      })
      setData(dataNew);
      ModalWindowEdit();
    }
    })
  } catch(err){
    alert(err)
  }
  }

  const ModalWindowEdit=()=>{
    setModalEdit(!modalEdit);
  }

  const ModalWindowInsert=()=>{
    setModalInsert(!modalInsert);
  }

  const What=(item, situation)=>{
    setWorker(item);
    if (situation==='Edit'){
      ModalWindowEdit()
    }
  }


  const bodyInsert=(
    <div className={styles.modal}>
      <h3>Добавление нового сотрудника</h3>
      <TextField name="last_name" className={styles.inputMaterial} label="Фамилия" onChange={handleChange}/>
      <br />
      <TextField name="first_name" className={styles.inputMaterial} label="Имя" onChange={handleChange}/>
      <br />
      <TextField name="patronimic_name" className={styles.inputMaterial} label="Отчество" onChange={handleChange}/>
      <br />
      <TextField name="e_mail" className={styles.inputMaterial} label="Электронная почта" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>queryPost()}>Добавить</Button>
        <Button onClick={()=>ModalWindowInsert()}>Отмена</Button>
      </div>
    </div>
  )

  const bodyEdit=(
    <div className={styles.modal}>
      <h3>Редактирование данных</h3>
      <TextField name="last_name" className={styles.inputMaterial} label="Фамилия" onChange={handleChange} value={worker && worker.last_name}/>
      <br />
      <TextField name="first_name" className={styles.inputMaterial} label="Имя" onChange={handleChange} value={worker && worker.first_name}/>
      <br />
      <TextField name="patronimic_name" className={styles.inputMaterial} label="Отчество" onChange={handleChange} value={worker && worker.patronimic_name}/>
      <br />
      <TextField name="e_mail" className={styles.inputMaterial} label="Электронная почта" onChange={handleChange} value={worker && worker.e_mail}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>queryPut()}>Сохранить</Button>
        <Button onClick={()=>ModalWindowEdit()}>Отмена</Button>
      </div>
    </div>
  )

  useEffect(async()=>{
    await queryGet();
  },[1])

  return(
    <div className="Workers">
      <Header />
       <br />
       <Button variant="contained" color="primary" onClick={()=>ModalWindowInsert()}>Новый сотрудник</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Фамилия</TableCell>
             <TableCell>Имя</TableCell>
             <TableCell>Отчество</TableCell>
             <TableCell>Электронная почта</TableCell>
             <TableCell>Действия</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {data.map(item=>(
             <TableRow key={item.worker_id}>
               <TableCell>{item.last_name}</TableCell>
               <TableCell>{item.first_name}</TableCell>
               <TableCell>{item.patronimic_name}</TableCell>
               <TableCell>{item.e_mail}</TableCell>
               <TableCell>
               <Link to={'/accountant/1/worker/'+item.worker_id} color="inherit"><Add className={styles.iconos}/></Link>
                 &nbsp;&nbsp;&nbsp;&nbsp;
               <Edit className={styles.iconos} onClick={()=>What(item, 'Edit')}/>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     <Modal
     open={modalInsert}
     onClose={ModalWindowInsert}>
        {bodyInsert}
     </Modal>
     <Modal
     open={modalEdit}
     onClose={ModalWindowEdit}>
        {bodyEdit}
     </Modal>
    </div>
  );
}

export default Workers;
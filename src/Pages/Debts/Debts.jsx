import React, {useEffect, useState} from 'react';
import './Debts.css';
import axios from 'axios';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';


const Debts = () =>  {

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

  let history = useHistory();
  const { id } = useParams();

  const [worker_debt, setWorkerDebt]=useState({
    debt: '',
    period_start: '',
    period_end: '',
    delay_period: '',
    payout_sum: '',
    payout_date: '',
    debt_increase_sum: '',
    debt_increase_date: '',
    interest_rate: '',
    days_in_year: '',
    percentage: ''
  })

  const queryGet=async()=>{
    await axios.get("https://vb6th073kf.execute-api.us-east-1.amazonaws.com/dev/accountants/1/workers/"+id)
    .then(response=>{
      setData(response.data)
    })
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setWorkerDebt(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(worker_debt);
  }

  const queryPost=async()=>{
    await axios.post("https://vb6th073kf.execute-api.us-east-1.amazonaws.com/dev/accountants/1/workers/"+id, worker_debt)
    .then(response=>{
      setData(data.concat(response.data))
      ModalWindowInsert()
    })
  }

  

  const ModalWindowInsert=()=>{
    setModalInsert(!modalInsert);
  }

  const bodyInsert=(
    <div className={styles.modal}>
      <h3>Добавление новой записи</h3>
      <TextField name="debt" className={styles.inputMaterial} label="Задолженность" onChange={handleChange}/>
      <br />
      <TextField name="period_start" className={styles.inputMaterial} label="Дата начала" onChange={handleChange}/>
      <br />
      <TextField name="period_end" className={styles.inputMaterial} label="Дата конца" onChange={handleChange}/>
      <br />
      <TextField name="delay_period" className={styles.inputMaterial} label="Количество дней" onChange={handleChange}/>
      <br />
      <TextField name="payout_sum" className={styles.inputMaterial} label="Сумма оплаты" onChange={handleChange}/>
      <br />
      <TextField name="payout_date" className={styles.inputMaterial} label="Дата оплаты" onChange={handleChange}/>
      <br />
      <TextField name="debt_increase_sum" className={styles.inputMaterial} label="Увеличение долга" onChange={handleChange}/>
      <br />
      <TextField name="debt_increase_date" className={styles.inputMaterial} label="Дата" onChange={handleChange}/>
      <br />
      <TextField name="interest_rate" className={styles.inputMaterial} label="Процентная ставка" onChange={handleChange}/>
      <br />
      <TextField name="days_in_year" className={styles.inputMaterial} label="Дней в году" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>queryPost()}>Добавить</Button>
        <Button onClick={()=>ModalWindowInsert()}>Отмена</Button>
      </div>
    </div>
  )
  useEffect(async()=>{
    await queryGet();
  },[])

  return(
    <div className="App">
       <br />
       <Button onClick={()=>ModalWindowInsert()}>Новая запись</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Задолженность, руб.</TableCell>
             <TableCell>Период просрочки
                 <TableRow>
                    <TableCell>с</TableCell>
                    <TableCell>по</TableCell>
                    <TableCell>дни</TableCell>
                </TableRow>
             </TableCell>
             <TableCell>Оплата
                <TableRow>
                    <TableCell>сумма, руб.</TableCell>
                    <TableCell>дата</TableCell>
                </TableRow>
             </TableCell>
             <TableCell>Увеличение долга
                <TableRow>
                    <TableCell>сумма, руб.</TableCell>
                    <TableCell>дата</TableCell>
                </TableRow>
             </TableCell>
             <TableCell>Процентная ставка</TableCell>
             <TableCell>Дней в году</TableCell>
             <TableCell>Проценты</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {data.map(item=>(
             <TableRow key={item.debt_id}>
               <TableCell>{item.debt}</TableCell>
               <TableCell>
               <TableRow>
                    <TableCell>{item.period_start}</TableCell>
                    <TableCell>{item.period_end}</TableCell>
                    <TableCell>{item.delay_period}</TableCell>
                </TableRow>
               </TableCell>
               <TableCell>
               <TableRow>
                    <TableCell>{item.payout_sum}</TableCell>
                    <TableCell>{item.payout_date}</TableCell>
                </TableRow>
               </TableCell>
               <TableCell>
               <TableRow>
                    <TableCell>{item.debt_increase_sum}</TableCell>
                    <TableCell>{item.debt_increase_date}</TableCell>
                </TableRow>
               </TableCell>
               <TableCell>{item.interest_rate}</TableCell>
               <TableCell>{item.days_in_year}</TableCell>
               <TableCell>{item.percentage}</TableCell>
             </TableRow>
           ))}
           <TableRow>
           <TableCell></TableCell>
               <TableCell>
               <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Итого</TableCell>
                    <TableCell>дни</TableCell>
                </TableRow>
               </TableCell>
               <TableCell>
               <TableRow>
                    <TableCell>сумма</TableCell>
                    <TableCell></TableCell>
                </TableRow>
               </TableCell>
               <TableCell>
               <TableRow>
                    <TableCell>сумма</TableCell>
                    <TableCell></TableCell>
                </TableRow>
               </TableCell>
               <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell>проценты</TableCell>
           </TableRow>
         </TableBody>
       </Table>
     </TableContainer>
     <Modal
     open={modalInsert}
     onClose={ModalWindowInsert}>
        {bodyInsert}
     </Modal>
    </div>
  );
}

export default Debts;
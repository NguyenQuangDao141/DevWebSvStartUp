import React, { Children, useEffect, useState } from 'react';
import firebase from './config'
import '../App.css';
// import { Button } from 'reactstrap'
// import { DateRangeTwoTone, Details } from '@material-ui/icons';

import ModalExample  from "./ModalExample";
export default function Appbar() {

    let count, velo, timeRemain, stt, data = [], stt1 = ['Chảy', 'Không chảy'];
    // let data1 = [];
    // const rootRef = firebase.database().ref();

    // const [time, setTime] = useState(new Date().toLocaleString());
    const [data1, setData1] = useState({});
    // rootRef.once("value", function (snapshot) {
    //     snapshot.forEach((childSnapshot) => {
    //         let {velo, time, stt} = childSnapshot.toJSON();
    //         data.push({velo, time, stt});
    //         // setData1(old => {
    //         //     return [...old, {velo, time, stt}]
    //         // })
    //     });
    // })

    useEffect(() => {
        const rootRef = firebase.database().ref();
        rootRef.on("value", function (snapshot) {
            if (snapshot.val() !== null) {
                setData1({...snapshot.val()})
            } else {
                setData1({});
            }
            // snapshot.forEach((childSnapshot) => {
            //     let {velo, time, stt} = childSnapshot.toJSON();
            //     data.push({velo, time, stt});
            //     // setData1(old => {
            //     //     return [...old, {velo, time, stt}]
            //     // })
            // });
        });

        return () => {
            setData1({})
        }

    }, [])
      
    // rootRef.once("value", (snap) => {
    //     count = (snap.numChildren())
    // })
    // rootRef.on('value', (childSnapshot) => {
    //     let dataTemp;
    //     for (let i = data.length; i > 0; i--) {
    //         data.pop();
    //     }
    //     for (let i = 1; i <= count; i++) {
    //         velo = childSnapshot.child(`${i}`).toJSON().velo;
    //         timeRemain = childSnapshot.child(`${i}`).toJSON().time;
    //         stt = childSnapshot.child(`${i}`).toJSON().stt;
    //         console.log(stt)
    //         dataTemp = { velo: velo, timeRemain: timeRemain, stt: stt }
    //         data.push(dataTemp)
    //     }
    //     // console.log(data);
    // })
    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         setTime(new Date().toLocaleString());
    //         return () => {
    //             clearInterval(this.interval)
    //         }
    //     }, 5000);
    // });
    // let i = 0;
    // const renderTable = (data, index) => {
    //     return (
    //         <tr key={index}>
    //             <td><ModalExample buttonLabel = {++i} content= {"sản phẩm của tôi ok    "} name={`Bệnh nhân: Nguyễn Văn Hà`} ></ModalExample></td>
    //             <td>{data.velo}</td>
    //             <td>{data.timeRemain}</td>
    //             <td>{data.stt ? stt1[0] : stt1[1]}</td>
    //         </tr>
    //     )
    // }
    const renderTable = (data) => {
        let newData = [];
        let index = 1;
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                newData.push({index:index, velo: element.velo, time: element.time, stt: element.stt, name: element.name});
                index++;
            }
        }
        return newData.map(item => {
            return (
                <tr key={item.index}>
                    <td><ModalExample buttonLabel = {item.index} content= {"sản phẩm của tôi ok    "} name={`Bệnh nhân: ${item.name}`} ></ModalExample></td>
                    <td>{item.name}</td>
                    <td>{item.velo}</td>
                    <td>{item.time}</td>
                    <td>{item.stt ? stt1[0] : stt1[1]}</td>
                </tr>
            );
        })
    }
    console.log(data1);
    return (
        <table className='students'>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Vận tốc</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {/* {data.map(item => {
                     return  (<tr key={item}>
                        <td><ModalExample buttonLabel = {++i} content= {"sản phẩm của tôi ok    "} name={`Bệnh nhân: Nguyễn Văn Hà`} ></ModalExample></td>
                        <td>{item.velo}</td>
                        <td>{item.time}</td>
                        <td>{item.stt ? stt1[0] : stt1[1]}</td>
                     </tr>)
                })} */}
                {renderTable(data1)}
            </tbody>
        </table>
    )
}

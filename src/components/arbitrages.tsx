import React, {useEffect, useState} from 'react';
import DataTable from "react-data-table-component";
import axios from 'axios';

const url = 'http://localhost:4000/arbitrage'
const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
  };
  const columns = [
    {
      id: 1,
      name: "Symbol",
      selector: (row: { symbol: any, rate: any, bybit: any, okx: any; }) => row.symbol,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Rate",
      selector: (row: { symbol: any, rate: any, bybit: any, okx: any; }) => row.rate,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "Bybit",
      selector: (row: { symbol: any, rate: any, bybit: any, okx: any; }) => row.bybit,
      sortable: true,
      right: true,
      reorder: true
    },
    {
      id: 4,
      name: "OKX",
      selector: (row: { symbol: any, rate: any, bybit: any, okx: any; }) => row.okx,
      sortable: true,
      right: true,
      reorder: true
    }
  ];

const Arbitrages = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getData();
        setInterval(getData, 10 * 60 * 1000);
    }, [])

    const getData = async () => {
        try {
            const res = await axios.get(url);
            if (res?.data?.success) {
                // console.log('data---', res.data.data.length)
                setData(res.data.data);
            }
        } catch (e) {
            console.log(e);
        }
        

    }
    return <div>
        <p className='text-xl text-center mt-8'>Arbitrages</p>
        {
            data.length ?
            <DataTable
        title="Arbitrages"
        columns={columns}
        data={data}
        // defaultSortFieldId={2}
        // sortIcon={<SortIcon />}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        selectableRows
      /> : <div>Empty</div>
        }
    </div>
}

export default Arbitrages;
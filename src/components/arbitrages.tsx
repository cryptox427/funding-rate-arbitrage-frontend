import React, {useEffect, useState} from 'react';
import DataTable from "react-data-table-component";
import axios from 'axios';

const url = 'http://45.153.242.72:4000/arbitrage'
const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
};
const columns:any = [
    {
        id: 1,
        name: "Symbol",
        selector: (row: { symbol: any, logo:any, rate: any, bybit: any, okx: any; }) =><div className={'flex items-center gap-x-1'}><img src={row.logo} className={'w-5'} alt={'symbol logo'} /> {row.symbol}</div> ,
        sortable: true,
        reorder: true
    },
    {
        id: 2,
        name: "Funding Rate",
        selector: (row: { symbol: any, rate: any, bybit: any, okx: any; }) => <>{(Number(row.rate) < 0) ? <div className={'text-red-500 font-semibold'}>{row.rate}</div> : <div className={'text-teal-500 font-semibold'}> {row.rate} </div>}</> ,
        sortable: true,
        reorder: true
    },
    {
        id: 3,
        name: "Bybit",
        selector: (row: { symbol: any, rate: any, bybit: any, okx: any; }) => <>{(Number(row.bybit) < 0) ? <div className={'text-red-500 font-semibold'}>{row.bybit}</div> : <div className={'text-teal-500 font-semibold'}> {row.bybit} </div>}</>,
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 4,
        name: "OKX",
        selector: (row: { symbol: any, rate: any, bybit: any, okx: any; }) => <>{(Number(row.okx) < 0) ? <div className={'text-red-500 font-semibold'}>{row.okx}</div> : <div className={'text-teal-500 font-semibold'}> {row.okx} </div>}</>,
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
                setData(res.data.data);
            }
        } catch (e) {
            console.log(e);
        }


    }
    return <div>
        <p className='text-xl text-center mt-8 font-bold'>Funding Rate Arbitrages</p>
        {
            data.length ?
                <DataTable
                    title=""
                    columns={columns}
                    data={data}
                    // defaultSortFieldId={2}
                    // sortIcon={<SortIcon />}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    // selectableRows
                /> : <div>Empty</div>
        }
    </div>
}

export default Arbitrages;
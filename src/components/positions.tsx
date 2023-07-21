import React, {useEffect, useState} from 'react';
import DataTable from "react-data-table-component";
import axios from 'axios';
import bybitLogo from '../assets/images/logo/bybit-logo.png';
import okxLogo from '../assets/images/logo/okx-logo.png';

const url = 'http://45.153.242.72:4000/positions';

const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
};

const columns:any = [
    {
        id: 1,
        name: "Exchange",
        selector: (row: { exchange: any, logo:any, symbol: any, direction: any, size: any; }) => <div className={'flex items-center gap-x-1 font-semibold'}><img src={row.logo} alt={'cex logo'} className={'w-5'}/> {row.exchange}</div>,
        sortable: true,
        reorder: true
    },
    {
        id: 2,
        name: "Symbol",
        selector: (row: { exchange: any, symbol: any, direction: any, size: any; }) => row.symbol,
        sortable: true,
        reorder: true
    },
    {
        id: 3,
        name: "Direction",
        selector: (row: { exchange: any, symbol: any, direction: any, size: any; }) => <>{row.direction === 'short'? <div className={'text-red-500 font-semibold'}>{row.direction}</div> : <div className={'text-teal-500 font-semibold'}>{row.direction}</div> }</> ,
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 4,
        name: "Size",
        selector: (row: { exchange: any, symbol: any, direction: any, size: any; }) => row.size,
        sortable: true,
        right: true,
        reorder: true
    }
];

const Positions = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getData();
        setInterval(getData, 10 * 60 * 1000);
    }, [])

    const getData = async () => {
        try {
            const res = await axios.get(url);
            if (res?.data?.success) {
                let tempData: any = [];
                if (res.data.data?.bybit) {
                    res.data.data?.bybit.map((bybit: { symbol: any; side: any; contracts: any; }) => {
                        return tempData.push({
                            exchange: 'Bybit',
                            logo: bybitLogo,
                            symbol: bybit.symbol,
                            direction: bybit.side,
                            size: bybit.contracts
                        });
                    })
                }
                if (res.data.data?.okx) {
                    res.data.data?.okx.map((okx: { symbol: any; side: any; contracts: any; }) => {
                        return tempData.push({
                            exchange: 'Okx',
                            logo: okxLogo,
                            symbol: okx.symbol,
                            direction: okx.side,
                            size: okx.contracts
                        });
                    })
                }
                setData(tempData);
            }
        } catch (e) {
            console.log(e);
        }


    }
    return <div>
        <p className='text-xl text-center mt-8 font-bold'>Positions</p>
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

export default Positions;
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../api/shopApiSlice';

export const Filter = () => {
    const { data } = useGetAllProductsQuery();
    const dispatch = useDispatch();
    const [filteredUsers, setFilteredUsers] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");

    const changeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        setFilteredUsers(data.filter((product) => product.title.toLowerCase().includes(action.payload.toLowerCase())));
    }, [searchTerm]);
    // Just for debug/logging purposes to see your filteredUsers
    useEffect(() => { console.log(filteredUsers) }, [filteredUsers]);
    return (
        <div>
            <input onChange={changeSearchTerm} type="text" value={searchTerm}></input>
        </div>
    )
}

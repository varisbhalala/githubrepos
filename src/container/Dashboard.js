import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import Inputbox from "components/Inputbox";
import { DashboardStore } from "store/Dashboard";
import "./Dashboard.scss";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Dashboard = (props) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [tag, setTag] = useState("java");
    const [resList, setList] = useState([]);

    const dashboardStore = useContext(DashboardStore);

    const { fireApi, list } = dashboardStore;

    const handleChange = (e, name) => {
        e.preventDefault();
        const value = e.target.value;
        if (name === "page") {
            setPage(value);
        } else if (name === "pageSize") {
            setPageSize(value);
        } else {
            setTag(value);
        }
    };

    useEffect(() => {
        setList(list);
    }, [list]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await fireApi(page, pageSize, tag);
    };

    return (
        <>
            <div className="dashboard__comp">
                <div className="searchForm">
                    <div className="searchbar">
                        <Inputbox
                            name="page"
                            placeHolder="page"
                            value={page}
                            onChange={handleChange}
                        />
                        <Inputbox
                            name="pageSize"
                            placeHolder="pageSize"
                            value={pageSize}
                            onChange={handleChange}
                        />
                        <Inputbox
                            name="tag"
                            placeHolder="page"
                            value={tag}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="submitButton">
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                {resList.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table
                            style={{ minWidth: "60px" }}
                            size="small"
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Profile_pic</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Tags</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resList.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            <img
                                                src={item.owner.profile_image}
                                                alt="profile_image"
                                                className="profile__image"
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.owner.display_name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.tags.join(",")}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.title}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </>
    );
};

export default observer(Dashboard);

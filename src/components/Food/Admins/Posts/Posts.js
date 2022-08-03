import React from 'react'
import { Grid, CircularProgress, CardMedia } from '@material-ui/core'
import { useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import UploadIcon from '@material-ui/icons/Update'
import { useDispatch } from 'react-redux'
import { deleteKalij } from '../../../../redux/actions/kalijs';
import '../Gallery/style.css'
import useStyles from './styles';
const Posts = ({ setCurrentId }) => {
    const dispatch = useDispatch();
    const { Kalijs, isLoading } = useSelector((state) => state.Kalijs);
    const classes = useStyles();

    if (!Kalijs.length && !isLoading) return 'No Post Found';
    return (
        isLoading ? <center><CircularProgress /></center> : (
            <Grid className={classes.container} id="place-to-visit" container alignItems="stretch" spacing={3}>
                <table className="contentTable">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>File</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Kalijs?.map((kalij) => (
                                <tr key={kalij._id}>
                                    <td>{kalij.title}</td>
                                    <td><CardMedia className={classes.madia} image={kalij.selectedFile} title={kalij.title} /></td>
                                    <td><DeleteIcon onClick={() => dispatch(deleteKalij(kalij._id))} /></td>
                                    <td><UploadIcon fontSize='small' onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentId(kalij._id)
                                    }} /></td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
            </Grid>
        )
    )
}

export default Posts

import React from 'react'
import { Grid, CircularProgress, CardMedia, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete'
import UploadIcon from '@material-ui/icons/Update'
import { useDispatch } from 'react-redux'
import { deleteaRoom } from '../../../../redux/actions/roomaction';
import { useNavigate } from 'react-router-dom';
import '../../../Food/Admins/Gallery/style.css'
const Posts = ({ setcurrentRoomId }) => {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const { Rooms, isLoading } = useSelector((state) => state.Room);
    const classes = useStyles();

    if (!Rooms.length && !isLoading) return 'No Post Found';
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
                    {Rooms?.map((Room) => (
                            <tr key={Room._id}>
                                <td onClick={()=>navigate(`/accessories/${Room._id}`)}>{Room.title}</td>
                                <td><CardMedia className={classes.madia} image={Room.selectedFile} title={Room.title} /></td>
                                <td><DeleteIcon onClick={() => { dispatch(deleteaRoom(Room._id)) }} fontSize="small" /></td>
                                <td><UploadIcon onClick={(e) => {
            e.stopPropagation();
            setcurrentRoomId(Room._id)
          }} fontSize="medium" /></td>
                            </tr>
                    ))}
                    </tbody>
                </table>
        </Grid>
        )
    )
}

export default Posts

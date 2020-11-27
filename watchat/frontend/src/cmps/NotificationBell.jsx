import React, { Component } from 'react'
import { Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { NotificationsIcon } from '@material-ui/icons';

export class NotificationBell extends Component {


  render(){
    return(
        <Badge 
        badgeContent={4} 
        color="secondary"
        // max={999} {...defaultProps}
        font
        >
             <NotificationsIcon className='bell' style={{ fontSize: 20 }} />
        </Badge>
        )
    }
}
  

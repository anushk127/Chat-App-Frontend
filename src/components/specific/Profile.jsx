/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Stack, Avatar, Typography } from '@mui/material';
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import moment from 'moment';
import { transformImage } from '../../lib/features';

const Profile = ({ user }) => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 100,
          height: 100,
          objectFit: 'contain',
          marginBottom: '1rem',
          border: '5px solid #fff',
        }}
      />
      <ProfileCard heading={'Bio'} text={user?.bio} />
      <ProfileCard
        heading={'Username'}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={'Name'} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={'Joined'}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    spacing={'1rem'}
    direction={'row'}
    alignItems={'center'}
    color={'white'}
    textAlign={'center'}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant='body1'>{text}</Typography>
      <Typography color={'gray'} variant='caption'>
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;

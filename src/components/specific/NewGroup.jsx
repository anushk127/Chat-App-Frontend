/* eslint-disable no-unused-vars */
// import React from 'react'

import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);

  const dispatch = useDispatch();
  const groupName = useInputValidation('');

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, newGroupLoading] = useAsyncMutation(useNewGroupMutation);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentEl) => currentEl !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error('Group name is required');
    if (selectedMembers.length < 2)
      return toast.error('Select at least 3 members');

    newGroup('Creating New Group', {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant='h4'>
          New Group
        </DialogTitle>
        <TextField
          label='Group'
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack justifyContent={'space-evenly'} direction={'row'}>
          <Button
            variant='outlined'
            color='error'
            size='large'
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            size='large'
            onClick={submitHandler}
            disabled={newGroupLoading}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'

import { useFetchData } from '6pp';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment';
import AdminLayout from '../../components/layout/AdminLayout';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';
import {
  CurveButton,
  SearchField,
} from '../../components/styles/StyledComponents';
import { matBlack } from '../../constants/color';
import { server } from '../../constants/config';
import { useErrors } from '../../hooks/hook';

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    'dashboard-stats'
  );

  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1rem' }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: '3rem',
          }}
        />
        <SearchField placeholder='Search...' />

        <CurveButton>Search</CurveButton>

        <Box flexGrow={1}></Box>

        <Typography
          display={{
            xs: 'none',
            sm: 'block',
          }}
          color={'rgba(0,0,0,0.7)'}
          textAlign={'center'}
        >
          {moment().format('dddd, D MMMM  YYYY')}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      spacing={'2rem'}
      justifyContent={'space-between'}
      alignItems={'center'}
      margin={'2rem 0'}
    >
      <Widget title={'Users'} value={stats?.usersCount} icon={<PersonIcon />} />
      <Widget
        title={'Chats'}
        value={stats?.totalChatsCount}
        icon={<GroupIcon />}
      />
      <Widget
        title={'Messages'}
        value={stats?.messagesCount}
        icon={<MessageIcon />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={'100vh'} />
      ) : (
        <Container component={'main'}>
          {Appbar}

          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            flexWrap={'wrap'}
            justifyContent={'center'}
            alignItems={{
              xs: 'center',
              lg: 'stretch',
            }}
            sx={{
              gap: '2rem',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: '2rem 3.5rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '45rem',
              }}
            >
              <Typography margin={'2rem 0'} variant='h4'>
                Last Messages
              </Typography>

              <LineChart value={stats?.messagesChart || []} />
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: '1rem',
                display: 'flex',
                borderRadius: '1rem',
                maxWidth: '25rem',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: '50%' },
                position: 'relative',
                // width: '100%',
              }}
            >
              <DoughnutChart
                labels={['Single Chat', 'Group Chats']}
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
              />
              <Stack
                position={'absolute'}
                direction={'row'}
                spacing={'.5rem'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}
                height={'100%'}
              >
                <GroupIcon /> <Typography>Vs</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>

          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: '2rem',
      margin: '2rem 0',
      borderRadius: '1.2rem',
      width: '20rem',
    }}
  >
    <Stack alignItems={'center'} spacing={'1rem'}>
      <Typography
        sx={{
          color: 'rgba(0,0,0,0.7)',
          borderRadius: '50%',
          border: `5px solid ${matBlack}`,
          width: '5rem',
          height: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </Typography>
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;

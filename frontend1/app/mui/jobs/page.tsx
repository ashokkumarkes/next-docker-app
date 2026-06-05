"use client";
import React from "react";
import MuiProvider from "../../../components/MuiProvider";
import { Container, Box, AppBar, Toolbar, Tabs, Tab, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl, IconButton, Typography } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { jobs } from "../../../shared/mock/data";

function JobsTable() {
  return (
    <Paper elevation={1} sx={{ borderRadius: 3, p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Site</InputLabel>
          <Select label="Site" defaultValue="">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="site1">Site 1</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Department</InputLabel>
          <Select label="Department" defaultValue="">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="eng">Engineering</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select label="Status" defaultValue="">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <Box component="thead">
          <Box component="tr" sx={{ backgroundColor: '#f3f4f6' }}>
            <Box component="th" sx={{ textAlign: 'left', p: 2 }}>Title</Box>
            <Box component="th" sx={{ textAlign: 'left', p: 2 }}>Department</Box>
            <Box component="th" sx={{ textAlign: 'left', p: 2 }}>Site</Box>
            <Box component="th" sx={{ textAlign: 'center', p: 2 }}>Positions</Box>
            <Box component="th" sx={{ textAlign: 'center', p: 2 }}>Status</Box>
            <Box component="th" sx={{ textAlign: 'center', p: 2 }}>Open / Close</Box>
            <Box component="th" sx={{ textAlign: 'center', p: 2 }}>Actions</Box>
          </Box>
        </Box>
        <Box component="tbody">
          {jobs.map((j) => (
            <Box component="tr" key={j.id} sx={{ borderTop: '1px solid #eef2f7' }}>
              <Box component="td" sx={{ p: 3 }}>
                <Button variant="contained" size="small" sx={{ borderRadius: 4, background: '#eef2ff', color: '#4f46e5', textTransform: 'none' }}>{j.title}</Button>
              </Box>
              <Box component="td" sx={{ p: 3 }}>{j.department}</Box>
              <Box component="td" sx={{ p: 3 }}>Main Office</Box>
              <Box component="td" sx={{ p: 3, textAlign: 'center' }}>1</Box>
              <Box component="td" sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ display: 'inline-block', px: 2, py: 0.5, borderRadius: 8, backgroundColor: j.status === 'Open' ? '#eef2ff' : '#fee2e2', color: j.status === 'Open' ? '#4f46e5' : '#b91c1c' }}>{j.status}</Box>
              </Box>
              <Box component="td" sx={{ p: 3, textAlign: 'center' }}>
                <div>3/5/2026 /</div>
                <div>3/25/2026</div>
              </Box>
              <Box component="td" sx={{ p: 3, textAlign: 'center' }}>
                <IconButton size="small"><VisibilityIcon /></IconButton>
                <IconButton size="small"><EditIcon /></IconButton>
                <IconButton size="small"><DeleteIcon /></IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

export default function MuiJobsPage() {
  const [tab, setTab] = React.useState(0);

  return (
    <MuiProvider>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <Toolbar>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary" indicatorColor="primary">
            <Tab label="Job Openings" />
            <Tab label="Candidates" />
            <Tab label="Interviews" />
            <Tab label="Offer Management" />
            <Tab label="Pre-Onboarding" />
            <Tab label="Equipment" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant="h5" component="div">Job Openings</Typography>
          </Grid>
          <Grid item>
            <Button startIcon={<AddIcon />} variant="contained" sx={{ mr: 2 }}>Add</Button>
            <Button startIcon={<RefreshIcon />} variant="outlined">Refresh</Button>
          </Grid>
        </Grid>

        <JobsTable />
      </Container>
    </MuiProvider>
  );
}

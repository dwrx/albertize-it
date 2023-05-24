import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Container, Typography } from '@mui/material';

function SelectImage() {
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/edit', { state: { image } });
  };

  const handleFile = e => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImage(file);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center', bgcolor: 'white', color: 'dark' }}>
        <Typography variant="h5" gutterBottom>Albertize it!</Typography>
        <form onSubmit={handleSubmit}>

          {/* "Image URL" works only locally due to CORS policies of the third-party websites */}
          { /* Downloading file to the local disk is the safest way to go */ }

          {/* <TextField variant="outlined" color="secondary" type="url" placeholder="Image URL" onChange={e => setImage(e.target.value)} /> */}
          <Box mt={2}>
            <Button variant="contained" component="label" color="secondary">
              Select File
              <input type="file" hidden accept="image/*" onChange={handleFile} />
            </Button>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="success" type="submit">Next</Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default SelectImage;

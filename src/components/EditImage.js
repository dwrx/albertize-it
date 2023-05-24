import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { Rnd } from 'react-rnd';
import { Box, Button, Container, Typography } from '@mui/material';

function EditImage() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageContainerRef = useRef();
  const [rndProps, setRndProps] = useState({ width: 200, height: 200, x: 0, y: 0 });

  useEffect(() => {
    if (!location.state?.image) {
      navigate('/');
    }
  }, [location, navigate]);

  const handleDownload = () => {
    toPng(imageContainerRef.current)
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(error => {
        alert('oops, something went wrong!');
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center', bgcolor: 'white', color: 'dark' }}>
        <Typography variant="h5" gutterBottom>You can move the mustache by clicking and dragging with your cursor. Give it a few tries, as it might not always work smoothly. You can also resize the mustache - just follow the pointer tips when you hover over the borders.</Typography>
        <Box ref={imageContainerRef} sx={{ position: 'relative', width: '800px', height: 'auto', mt: 2, mb: 2 }}>
          <img src={location.state?.image} alt="User-selected" style={{ width: '100%', height: 'auto' }} />
          <Rnd
            size={{ width: rndProps.width, height: rndProps.height }}
            position={{ x: rndProps.x, y: rndProps.y }}
            onDragStop={(e, d) => {
              setRndProps({ ...rndProps, x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setRndProps({
                width: ref.style.width,
                height: ref.style.height,
                ...position,
              });
            }}
          >
            <img src="albert.png" alt="Albert" style={{ width: '100%', height: '100%' }} />
          </Rnd>
        </Box>
        <Button variant="contained" color="secondary" onClick={handleDownload}>Download</Button>
      </Box>
    </Container>
  );
}

export default EditImage;

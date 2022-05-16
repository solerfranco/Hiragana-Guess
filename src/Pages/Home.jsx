import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});

const hiraganaArray = [
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
  "を",
  "ん",
];

const words = [
  {
    word: "いぬ",
    imageUrl: "dog.png",
  },
  {
    word: "ねこ",
    imageUrl: "cat.png",
  },
  {
    word: "うほ",
    imageUrl: "horse.png",
  },
];

const Home = () => {
  const [guess, setGuess] = React.useState([]);
  const [word, setWord] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const handleGuess = (value) => {
    if (guess.length === word.length) return;
    setGuess((g) => [...g, value]);
  };

  const removeLastLetter = () => {
    setGuess((g) => g.slice(0, g.length - 1));
  };

  useEffect(() => {
    if (guess.length > 0) {
      checkGuess();
    }
  }, [guess]);

  useEffect(() => {
    getRandomWord();
  }, []);

  const checkGuess = () => {
    if (guess.length === word.length) {
      if (guess.join("") === word.join("")) {
        setOpen(true);
        setGuess([]);
        getRandomWord();
      } else {
        setOpenError(true);
      }
    }
  };

  const getRandomWord = () => {
    let randomIndex = Math.floor(Math.random() * words.length);
    let randomWord = words[randomIndex];
    while (word.join("") === randomWord.word) {
      randomIndex = Math.floor(Math.random() * words.length);
      randomWord = words[randomIndex];
    }
    setWord(randomWord.word.split(""));
    setImageUrl(randomWord.imageUrl);
  };

  return (
    <Box
      display="flex"
      mt={1}
      justifyContent="space-between"
      flexDirection="column"
      height="100vh"
    >
      <Container maxWidth="xs">
        <Box>
          <Container maxWidth="xs">
            <Box display="flex">
              <img
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  border: "5px solid white",
                  height: "200px",
                  objectFit: "cover",
                }}
                src={`/images/words/${imageUrl}`}
                alt="word"
              />
            </Box>
          </Container>
          <Box
            my={1}
            onClick={getRandomWord}
            display="flex"
            justifyContent="center"
          >
            <Button color="error" variant="contained">
              <ReplayIcon />
            </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            {word.map((_, i) => (
              <Box
                key={i}
                display="flex"
                onClick={removeLastLetter}
                justifyContent="center"
                alignItems="center"
                m={0.4}
                sx={{
                  cursor: "pointer",
                  width: 58,
                  height: 58,
                  border: "3px solid #c4bfa3",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  {guess[i]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" px={0.5} flexWrap="wrap">
          {hiraganaArray.map((hiragana, i) => (
            <Box
              onClick={() => handleGuess(hiragana)}
              key={hiragana}
              display="flex"
              justifyContent="center"
              alignItems="center"
              m={0.3}
              sx={{
                cursor: "pointer",
                width: 46,
                height: 46,
                borderRadius: "10px",
                backgroundColor: "#c4bfa3",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {hiragana}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ¡Correcto!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          ¡Incorrecto!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;

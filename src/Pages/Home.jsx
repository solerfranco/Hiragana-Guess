import {
  Box,
  Button,
  CircularProgress,
  Container,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "reactfire";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";

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

const tentenArray = [
  "が",
  "ぎ",
  "ぐ",
  "げ",
  "ご",
  "ざ",
  "じ",
  "ず",
  "ぜ",
  "ぞ",
  "だ",
  "ぢ",
  "づ",
  "で",
  "ど",
  "ば",
  "び",
  "ぶ",
  "べ",
  "ぼ",
];

const maruArray = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];

const Home = () => {
  const [guess, setGuess] = React.useState([]);
  const [word, setWord] = React.useState([]);
  const [romaji, setRomaji] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [words, setWords] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [keyboard, setKeyboard] = React.useState(hiraganaArray);

  const db = useFirestore();

  const navigate = useNavigate();

  const getWords = async () => {
    const querySnapshot = await getDocs(collection(db, "words"));
    const tempWords = querySnapshot.docs.map((doc) => doc.data());
    setWords(tempWords);
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      getRandomWord();
    }
  }, [words]);
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

  const checkGuess = () => {
    if (guess.length === word.length) {
      if (guess.join("") === word.join("")) {
        setOpen(true);
        getRandomWord();
      } else {
        setOpenError(true);
        setGuess([]);
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
    setRomaji(randomWord.romaji);
    handleLoad();
    setImageUrl(randomWord.imageUrl);
    setGuess([]);
  };

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
        <Box mb={4}>
          <Container maxWidth="xs">
            <Box display="flex" position="relative">
              <img
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  border: "5px solid white",
                  height: "200px",
                  objectFit: "cover",
                  backgroundImage: "url('images/placeholder.png')",
                  backgroundSize: "fill",
                }}
                src={`${imageUrl}`}
                alt=""
              />
              {loading && (
                <Box
                  position="absolute"
                  style={{
                    right: "5px",
                    left: "5px",
                    top: "5px",
                    bottom: "5px",
                    backgroundColor: "#00000055",
                    borderRadius: "15px",
                  }}
                >
                  <CircularProgress
                    style={{
                      position: "absolute",
                      right: "0",
                      left: "0",
                      top: "0",
                      marginTop: "auto",
                      marginLeft: "auto",
                      marginRight: "auto",
                      bottom: "0",
                      marginBottom: "auto",
                    }}
                  />
                </Box>
              )}
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
          <Box display="flex" justifyContent="center" alignItems="center">
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
            <Tooltip title={`Romaji: ${romaji}`}>
              <HelpIcon sx={{ color: "gray" }} />
            </Tooltip>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-evenly">
          <Box
            onClick={() => setKeyboard(maruArray)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            m={0.3}
            sx={{
              cursor: "pointer",
              width: 46,
              height: 46,
              borderRadius: "10px",
              backgroundColor: "success.main",
            }}
          >
            <Typography
              style={{
                paddingTop: "20%",
                paddingLeft: "80%",
              }}
              variant="h3"
              fontWeight="bold"
              color="white"
            >
              ゜
            </Typography>
          </Box>
          <Box
            onClick={() => setKeyboard(hiraganaArray)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            m={0.3}
            sx={{
              cursor: "pointer",
              width: 46,
              height: 46,
              borderRadius: "10px",
              backgroundColor: "success.main",
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="white">
              あ
            </Typography>
          </Box>
          <Box
            onClick={() => setKeyboard(tentenArray)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            m={0.3}
            sx={{
              cursor: "pointer",
              width: 46,
              height: 46,
              borderRadius: "10px",
              backgroundColor: "success.main",
            }}
          >
            <Typography
              style={{
                paddingTop: "20%",
                paddingLeft: "80%",
              }}
              variant="h3"
              fontWeight="bold"
              color="white"
            >
              ゛
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" px={0.5} flexWrap="wrap">
          {keyboard.map((hiragana, i) => (
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
      <Button onClick={() => navigate("/add")}>
        Add
      </Button>
    </Box>
  );
};

export default Home;

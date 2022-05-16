import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReplayIcon from "@mui/icons-material/Replay";

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
        alert("Correct!");
        setGuess([]);
        getRandomWord();
      } else {
        alert("Incorrect!");
      }
    }
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setWord(randomWord.word.split(""));
    setImageUrl(randomWord.imageUrl);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
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
    </Box>
  );
};

export default Home;

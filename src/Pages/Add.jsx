import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useFirestore, useStorage } from 'reactfire';
import { doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytes } from "firebase/storage";
import { useState } from 'react';

const Add = () => {
    const db = useFirestore();
    const storage = useStorage();

    const [id, setId] = useState("");
    const [word, setWord] = useState("");
    const [romaji, setRomaji] = useState("");
    const [file, setFile] = useState(null);

    // Add a new document in collection "words"
    const addWord = () => {
        setDoc(doc(db, `words`, id), {
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/hiragana-guess.appspot.com/o/words%2F${id}?alt=media`,
          romaji,
          word
        });
    }

    const uploadImage = () => {
        const storageRef = ref(storage, `words/${id}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            console.log(snapshot)
            addWord();
        });
    }

    const onChange = event => {
        const fileList = event.target.files;
        setFile(fileList[0]);
    }

    return (
        <Box>
            <Container maxWidth="sm">
                <Box 
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }} 
                display="flex" 
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                >
                    <Box mt={4}>
                        <Typography variant="h4">Añadir Palabra</Typography>
                    </Box>
                    <input onChange={onChange} type="file" />
                    <TextField color="secondary" value={id} onChange={(e => setId(e.target.value))} label="Word" variant="outlined"/>
                    <TextField color="secondary" value={word} onChange={(e => setWord(e.target.value))} label="Hiragana" variant="outlined"/>
                    <TextField color="secondary" value={romaji} onChange={(e => setRomaji(e.target.value))} label="Romaji" variant="outlined"/>
                    <Button sx={{textTransform:"none"}} variant="contained" color="secondary">
                        <Typography onClick={uploadImage} variant="h6">Añadir Palabra</Typography>
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Add;
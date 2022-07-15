import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, StorageProvider, useFirebaseApp } from "reactfire";
import Add from "./Pages/Add";
import { getStorage } from "firebase/storage";

function App() {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);
  const storeInstance = getStorage(app)
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <StorageProvider sdk={storeInstance}>
        <Router>
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </StorageProvider>
    </FirestoreProvider>
  );
}

function Users() {
  return <h2>Users</h2>;
}

export default App;

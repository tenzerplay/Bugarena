import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Loading from "./components/Loading";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import Features from "./components/features";
import About from "./components/about";
import DetailChallange from "./components/detail-challenge"
import Dashboard from "./components/dashboard";
import Challenges from "./components/challenges";
import VulnerabilityChallenges from "./components/Vulnerability/vulnerabilitychallenges";
import Challenge1 from "./components/Vulnerability/challenge1";
import Challenge2 from "./components/Vulnerability/challenge2";
import Resources from "./components/resource";
import CodeCompilerPage from "./views/CodeCompilerPage";
import ExploreLearningPath from "./components/ExploreLearningPath";
import DetailLearningPath from "./components/detail-learning-path";
import VulnerabilityLearning from "./components/Vulnerability/vulnerabilitylearning";
import LearningPath1 from "./components/Vulnerability/learning-path-1";

// Import styles
import "./App.css";

// Initialize FontAwesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    console.error("Auth0 Error:", error);
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />}
            />
            <Route
              path="/external-api"
              element={isAuthenticated ? <ExternalApi /> : <Navigate to="/" replace />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route path="/challenges">
              <Route
                index
                element={isAuthenticated ? <Challenges /> : <Navigate to="/" replace />}
              />
              <Route
                path="detail/:id"
                element={isAuthenticated ? <DetailChallange /> : <Navigate to="/" replace />}
              />
            </Route>

            <Route path="/learning-path">
              <Route
                index
                element={
                  isAuthenticated ? <ExploreLearningPath /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="detail/:id"
                element={
                  isAuthenticated ? <DetailLearningPath /> : <Navigate to="/" replace />
                }
              />
            </Route>
            <Route
              path="/vulnerability-challenges"
              element={isAuthenticated ? <VulnerabilityChallenges /> : <Navigate to="/" replace />}
            />
            <Route
              path="/vulnerability-learning"
              element={
                isAuthenticated ? (
                  <VulnerabilityLearning />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/vulnerability-learning/1"
              element={
                isAuthenticated ? <LearningPath1 /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/vulnerability-challenges/1"
              element={isAuthenticated ? <Challenge1 /> : <Navigate to="/" replace />}
            />
            <Route
              path="/vulnerability-challenges/2"
              element={isAuthenticated ? <Challenge2 /> : <Navigate to="/" replace />}
            />
            <Route
              path="/resources"
              element={isAuthenticated ? <Resources /> : <Navigate to="/" replace />}
            />
            <Route
              path="/code-compiler"
              element={isAuthenticated ? <CodeCompilerPage /> : <Navigate to="/" replace />}
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
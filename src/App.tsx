import { lazy, Suspense } from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MobileHero3D = lazy(() => import("./components/MobileHero3D"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth <= 768 ||
      window.matchMedia("(pointer: coarse)").matches);

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            {isMobile ? (
              <Suspense>
                <MobileHero3D />
              </Suspense>
            ) : (
              <Suspense>
                <CharacterModel />
              </Suspense>
            )}
          </MainContainer>
        </Suspense>
      </LoadingProvider>
      <Analytics />
    </>
  );
};

export default App;

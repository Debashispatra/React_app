import { lazy,Suspense } from "react";
import UserGallery from "./Component.jsx/UserGallery";
const SuspenseExample = lazy(() => import("./SuspenseExample"));


function App() {
  return (
    <>
    {/* <Suspense fallback={<p>Loading</p>}>
      <SuspenseExample></SuspenseExample>
    </Suspense> */}
    <div style={{ padding: "20px" }}>
      <h1 style={{textAlign: "center"}}>User Card Gallery</h1>

      <Suspense fallback={<p>Loading users...</p>}>
        <UserGallery />
      </Suspense>
    </div>

    </>
  )
}
export default App;
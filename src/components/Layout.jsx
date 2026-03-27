import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        {children}
      </div>
    </>
  );
}
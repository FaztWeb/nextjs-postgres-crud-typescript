import { Container } from "semantic-ui-react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main
        style={{
          backgroundColor: "#212121",
        }}
      >
        <Container
          style={{
            paddingTop: "2rem",
            height: "90vh",
          }}
        >
          {children}
        </Container>
      </main>
    </div>
  );
};

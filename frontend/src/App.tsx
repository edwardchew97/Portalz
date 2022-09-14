import "./App.css";
import Nav from "./components/Nav";
import CompleteModal from "./components/CompleteModal";
import { Form } from "./components/Form";
import { SolanaConnectWallet } from "./components/SolanaConnectWallet";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "./theme/chakra-theme";

function App() {
  return (
    <SolanaConnectWallet>
      <ChakraProvider theme={chakraTheme}>
        <div className="container">
          <Nav />
          <Form />
        </div>
        <CompleteModal />
      </ChakraProvider>
    </SolanaConnectWallet>
  );
}

export default App;

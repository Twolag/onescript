import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Compatibility from "./pages/Compatibility";
import Support from "./pages/Support";
import Purchase from "./pages/Purchase";
import Trial from "./pages/Trial";
import Documentation from "./pages/Documentation";
import Reviews from "./pages/Reviews";
import LegalNotice from "./pages/LegalNotice";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/compatibility" component={Compatibility} />
        <Route path="/support" component={Support} />
        <Route path="/purchase" component={Purchase} />
        <Route path="/trial" component={Trial} />
        <Route path="/documentation" component={Documentation} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/legal" component={LegalNotice} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

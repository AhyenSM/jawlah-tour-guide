import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import GamePage from "@/pages/GamePage";
import { SurveyProvider } from "./context/SurveyContext";
import ImageTest from "@/components/ImageTest";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/game" component={GamePage} />
      <Route path="/test" component={ImageTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SurveyProvider>
        <Router />
        <Toaster />
      </SurveyProvider>
    </QueryClientProvider>
  );
}

export default App;

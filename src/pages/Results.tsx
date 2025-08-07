import { ResultsDisplay } from "../components/results/ResultsDisplay";
import { useResultsStore } from "../store/results-store";

const ResultsPage = () => {
  const { results, loading } = useResultsStore();

  return (
    <div className="container mx-auto px-4 sm:px-6 flex-grow overflow-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Screening Results
        </h1>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
          Our AI has analyzed the resumes and ranked the candidates based on the
          job requirements.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <ResultsDisplay loading={loading} results={results} />
      </div>
    </div>
  );
};

export default ResultsPage;

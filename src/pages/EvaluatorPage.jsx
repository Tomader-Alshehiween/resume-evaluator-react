import useEvaluator from '../hooks/useEvaluator'

function EvaluatorPage() {
    const {
        jobDescription,
        setJobDescription,
        prompt,
        setPrompt,
        setFile,
        status,
        errorMessage,
        result,
        handleSubmit,
    } = useEvaluator()

    return (
        <main>
            <section id="section1">
                <form id="resume-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="job-description">Job Description *</label>
                        <textarea
                            id="job-description"
                            placeholder="Paste the job description here..."
                            rows="10"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="custom-prompt">Custom Prompt</label>
                        <textarea
                            id="custom-prompt"
                            placeholder="Enter your custom prompt..."
                            rows="6"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="resume-file">Upload Resume (PDF only)</label>
                        <input
                            type="file"
                            id="resume-file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0] || null)}
                        />
                    </div>

                    <button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Evaluating...' : 'Evaluate Resume'}
                    </button>
                </form>
            </section>

            <section>
                <div id="results">
                    {status === 'idle' && <p>Results will appear here.</p>}

                    {status === 'loading' && <p>Evaluating resume...</p>}

                    {status === 'error' && (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    )}

                    {status === 'success' && <p>{result}</p>}
                </div>
            </section>
        </main>
    )
}

export default EvaluatorPage